import axios from "axios";
import { useState } from "react";
import { useData } from "../../context/dataProvider";
import { BASE_URL } from "../../utils/utils";

export const UpdateGroupInfoForm = ({
  group,
  isAdmin,
  setShowRecipientDetails,
}: {
  group: any;
  isAdmin: boolean;
  setShowRecipientDetails: (value: boolean) => void;
}) => {
  const [showEditName, setShowEditName] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);
  const { updateGroup } = useData();

  const updateHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowEditDescription(false);
    setShowEditName(false);
    updateGroup(group._id, name, description, false);
    const {
      data: { status },
    } = await axios.put(`${BASE_URL}/groups/update_group`, {
      groupId: group._id,
      name: name,
      description: description,
      isPublic: false,
    });
    setShowRecipientDetails(false);
  };

  return (
    <form onSubmit={(e) => updateHandler(e)}>
      <div className="border-2 border-gray-200 bg-white mt-4 px-3 py-2">
        <div>
          <span className="font-medium"> Name </span>{" "}
          {isAdmin && (
            <i
              className="fa fa-pencil float-right"
              onClick={() => setShowEditName(true)}
            ></i>
          )}
        </div>
        {showEditName ? (
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-full w-full my-2 px-3 py-1 shadow-md"
            />
            <button
              type="submit"
              disabled={name === "" || name === group.name}
              className={`rounded-full px-3 py-1 shadow-md ${
                name === "" || name === group.name
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Save
            </button>

            <i
              onClick={() => {
                setName(group.name);
                setShowEditName(false);
              }}
              className="fa fa-close ml-2"
            ></i>
          </div>
        ) : (
          <p>{name} </p>
        )}
      </div>
      <div className="mt-4 px-3 py-2 border-2 border-gray-200 bg-white">
        <div>
          <span className="font-medium"> Description </span>{" "}
          {isAdmin && (
            <i
              className="fa fa-pencil float-right"
              onClick={() => setShowEditDescription(true)}
            ></i>
          )}
        </div>
        {showEditDescription ? (
          <div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-full w-full my-2 px-3 py-1 shadow-md"
            />
            <button
              type="submit"
              disabled={description === "" || description === group.description}
              className={`rounded-full px-3 py-1 shadow-md ${
                description === "" || description === group.description
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Save
            </button>
            <i
              onClick={() => {
                setDescription(group.description);
                setShowEditDescription(false);
              }}
              className="fa fa-close ml-2"
            ></i>
          </div>
        ) : (
          <p>{description} </p>
        )}
      </div>
    </form>
  );
};
