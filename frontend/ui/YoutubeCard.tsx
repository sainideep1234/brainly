import CardHeader from "./CardHeader";
import Youtube from "@/public/icons/Youtube";

const YoutubeCard = ({
  id,
  title,
  description,
  onDelete,
}: {
  id: string;
  title: string;
  description?: string | null;
  onDelete?: () => void;
}) => {
  return (
    <div className="max-w-sm break-inside-avoid shadow-2xl p-5 rounded-xl flex-col bg-bg-side border border-border">
      <CardHeader title={title || "Youtube"} onDelete={onDelete}>
        <Youtube />
      </CardHeader>
      <iframe
        className="rounded-md my-4"
        id="ytplayer"
        width="300"
        height="200"
        src={`https://www.youtube.com/embed/${id}`}
        allowFullScreen
      ></iframe>
      {description && <div className="py-2 text-text-sec text-sm">{description}</div>}
    </div>
  );
};

export default YoutubeCard;
