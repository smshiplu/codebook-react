import { BsStar, BsStarFill } from "react-icons/bs";
export const Rating = ({rating}) => {
  const ratingArr = Array(5).fill(false);
  ratingArr.forEach((val, idx) => {
    idx < rating ? ratingArr[idx] = true : ratingArr[idx] = false;
  });

  return (
    <>
    { ratingArr.map((value, index) => (
      value ? <BsStarFill key={index} className="text-lg text-yellow-500 mr-1" /> : <BsStar key={index} className="text-lg text-yellow-500 mr-1" />
    )) }
    </>
  )
}
