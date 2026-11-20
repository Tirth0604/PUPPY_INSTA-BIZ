export default function NotFound() {
  return (
    <section className="gutter empty-page">
      <p className="font-scrawl">a little lost?</p>
      <h1 className="font-plush text-big">This puppy wandered off</h1>
      <p>We couldn’t find that page. Let’s get you home.</p>
      <a className="btn btn-primary mt-6" href="/">
        Back home
      </a>
      <a className="btn btn-ghost mt-6" href="/puppies">
        Meet the pups
      </a>
    </section>
  );
}
