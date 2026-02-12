import Cross from "@/public/icons/Cross";
import React from "react";

const AddContentModal = ({ onAddClick }: { onAddClick: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0  bg-black/50"></div>
      <div className="relative z-10  bg-white p-6 rounded-lg shadow-lg min-w-xl ">
        <div className="flex flex-col gap-1 mt-4">
          <button onClick={onAddClick} className="self-end">
            <Cross />
          </button>
          <label htmlFor="title" className="text-lg font-medium">
            Title*
          </label>
          <input
            type="text"
            placeholder="Title.."
            className="focus:ring-1 border-border border px-2 py-2 text-md font-normal "
            id="title"
          />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="description" className="text-lg font-medium">
            Description
          </label>
          <textarea
            placeholder="Descritions.."
            className="px-2 py-2 text-md font-normal border-border border"
            id="description"
          />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="link" className="text-lg font-medium ">
            Link
          </label>
          <input
            type="text"
            placeholder="link.."
            className="border-border border px-2 py-2 text-md font-normal"
            id="link"
          />
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="tag" className="text-lg font-medium ">
            Tags
          </label>
          <input
            type="text"
            placeholder="#useful, #project.."
            className="border-border border px-2 py-2 text-md font-normal"
            id="tag"
          />
        </div>
        <div className="flex py-4 gap-4">
          <div>
            <input type="radio" id="linkChoice1" name="contact" value="email" />
            <label htmlFor="linkChoice1" className="text-lg font-semibold px-1">
              Youtube
            </label>
          </div>
          <div>
            <input type="radio" id="linkChoice2" name="contact" value="phone" />
            <label
              htmlFor="linkChoice2"
              className="text-lg font-semibold px-1 "
            >
              Tweet
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="contactChoice3"
              name="contact"
              value="mail"
            />
            <label
              htmlFor="contactChoice3"
              className="text-lg font-semibold px-1 "
            >
              Documents
            </label>
          </div>
        </div>

        <button className="bg-text-ter w-full py-2 rounded-xl text-text-quad text-xl font-bold hover:text-text-pri transition-all duration-300 delay-100 hover:bg-text-sec">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddContentModal;
