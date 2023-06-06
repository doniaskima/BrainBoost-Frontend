import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/authProvider";
import { useData } from "../../context/dataProvider";
import { BASE_URL } from "../../utils/utils";

interface CreateGroupFormProps {
  setShowCreateGroupForm: (show: boolean) => void;
}

export const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  setShowCreateGroupForm,
}) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const { addGroup } = useData();

  const createGroupHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    setName("");
    setDescription("");
    try {
      const {
        data: { group },
      } = await axios.post(`${BASE_URL}/groups/create`, {
        adminId: user?._id,
        isPublic: false,
        description: description,
        groupName: name,
      });
      addGroup(group);
      setShowCreateGroupForm(false);
    } catch (error) {
      setError("Error creating group");
    }
  };

  return (
    <div className="w-full px-2 mb-2">
      {error !== "" && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={(e) => createGroupHandle(e)}>
        <div>
          <input
            type="text"
            className="rounded-full w-full my-2 px-3 py-1 shadow-md"
            placeholder="Group Name"
            value={name}
            onChange={(e) => {
              setError("");
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            className="rounded-full w-full my-2 px-8 py-1 shadow-md"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          disabled={name === ""}
          className={`bg-white rounded-full px-3 py-1 shadow-md ${
            name !== "" ? "cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          Create
        </button>
        <i
          onClick={() => setShowCreateGroupForm(false)}
          className="fa fa-close ml-2 cursor-pointer"
        ></i>
      </form>
    </div>
  );
};
