import Link from "next/link";

function NotFound() {
  return (
    <section
      className="l-container min-h-screen flex flex-col justify-center items-center bg-inditext-indigo-100"
      style={{
        backgroundImage: `url('/images/view-notfound.jpg')`,
        backgroundSize: "contain",
      }}
    >
      <div className="relative z-10 text-indigo-100 p-2 text-center overflow-hidden">
        <h1 className="text-[6rem] font-extrabold text-red-500 ">404</h1>
        <h2 className="text-[3rem] font-semibold mt-2 text-green-400">
          Congratulations!
        </h2>
        <p className="text-lg mt-4 font-bold text-slate-200  bg-green-500 p-2 rounded-md">
          You&lsquo;ve climbed to the top of our site, enjoy the view, then
          happily return back to our{" "}
          <Link
            href="/"
            className="text-primary font-bold underline rounded p-1"
          >
            HomePage
          </Link>
        </p>
      </div>
    </section>
  );
}

export default NotFound;
