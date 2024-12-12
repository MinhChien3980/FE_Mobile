import { AirbnbRating, Rating } from "react-native-ratings";

export const StarRating = ({ defaultRating = 5 }) => {
  const ratingCompleted = (rating: any) => {
    console.log("Rating is: " + rating);
  };
  return (
    <>
  
      {/* <Rating
        type="heart"
        ratingCount={3}
        imageSize={60}
        showRating
        onFinishRating={ratingCompleted}
      /> */}
    </>
  );
};
