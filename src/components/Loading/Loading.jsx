import MoonLoader from "react-spinners/MoonLoader";

export default function Loading() {

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };


  return <>
    <div className="sweet-loading py-10">

      <MoonLoader
        color={'#0aad0a'}
        cssOverride={override}
        size={90}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  </>
}
