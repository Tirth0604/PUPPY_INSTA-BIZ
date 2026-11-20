const { spawnSync } = require("node:child_process");

const result = spawnSync("python", ["-c", `
import os
from pathlib import Path
from tempfile import NamedTemporaryFile
from zipfile import ZipFile, ZIP_DEFLATED

root = Path.cwd()
target = root.parent / 'teddypups-website-clone-checkpoint.zip'
excluded = {'node_modules', '.next', '.git', '.local', 'test-results', 'playwright-report', 'comparison-before'}

with NamedTemporaryFile(dir=target.parent, prefix=target.name + '.', suffix='.partial', delete=False) as temp:
    pending = Path(temp.name)
try:
    with ZipFile(pending, 'w', ZIP_DEFLATED, compresslevel=6) as archive:
        for path in root.rglob('*'):
            relative = path.relative_to(root)
            if not path.is_file() or excluded.intersection(relative.parts):
                continue
            if path.name.startswith('.env') and path.name != '.env.example':
                continue
            if path.name.endswith('.tsbuildinfo'):
                continue
            if path.suffix == '.png' and 'screenshots' in relative.parts and path.with_suffix('.jpg').exists():
                continue
            archive.write(path, Path(root.name) / relative)
    with ZipFile(pending) as archive:
        assert archive.testzip() is None
        assert f'{root.name}/package-lock.json' in archive.namelist()
        assert f'{root.name}/docs/CHECKPOINT.md' in archive.namelist()
    os.replace(pending, target)
finally:
    pending.unlink(missing_ok=True)
print(f'{target} ({target.stat().st_size} bytes; CRC verified)')
`], { stdio: "inherit" });

if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
