import CardHeader from "./CardHeader";
import Youtube from "@/public/icons/Youtube";

const YoutubeCard = () => {
  return (
    <div className="max-w-sm break-inside-avoid shadow-card px-4 py-2 rounded-md flex-col">
      <CardHeader title={"Youtube"}>
        <Youtube />
      </CardHeader>
      <iframe
        className="rounded-md my-4"
        id="ytplayer"
        width="300"
        height="200"
        src={`https://www.youtube.com/embed/4otzFt-vOmw`}
        allowFullScreen
      ></iframe>
      <div className="flex gap-2 ">
        <span className="text-btn-pri bg-btn-sec px-2 py-1 rounded-xl text-sm">
          #productivity
        </span>
      </div>
      <div className="text-sm text-date py-4">Added on 10/3/2024</div>
    </div>
  );
};

export default YoutubeCard;
