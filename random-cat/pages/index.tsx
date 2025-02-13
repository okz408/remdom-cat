import { error } from "console";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url);
      setLoading(false);
    });
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  }

  return (
    <div>
      <button onClick={handleClick}>他の猫も見る</button>
      <div>{loading || <img src={imageUrl} />}</div>
    </div>
  );
};
export default IndexPage;

type Image = {
  url: string
}
const fetchImage = async(): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images: unknown = await res.json();
  if (!Array.isArray(images)) {
    throw new Error("画面情報の取得に失敗");
  }
  const image: unknown = images[0];
  if (!isImage(image)) {
    throw new Error("画面情報の取得に失敗");
  }
  return image;
}

const isImage = (value: unknown): value is Image => {
  if (!value || typeof value !== "object") {
    return false;
  }
  return "url" in value && typeof value.url === "string";
}

// fetchImage();