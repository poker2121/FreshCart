import img from '../../assets/images/error.svg';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <img src={img} alt="Not Found" className="max-w-full h-auto" />
    </div>
  );
}
