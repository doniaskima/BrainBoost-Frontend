import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store/store";
import {addMemberToGroup} from "../../store/reducers/groupSlice"
const BASE_URL = "http://localhost:3000/";

interface CreateGroupFormProps {
  setShowCreateGroupForm: (show: boolean) => void;
}

export const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  setShowCreateGroupForm,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user.user); 
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createGroupHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    setName("");
    setDescription("");

    try {
      const response = await axios.post(`${BASE_URL}/groups/create`, {
        adminId: user?.id,
        isPublic: false,
        description: description,
        groupName: name,
      });

      const { group } = response.data;
      // dispatch(addMemberToGroup(group));
      setShowCreateGroupForm(false);
    } catch (error) {
      setError("Error creating group. Please try again.");
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
            className="rounded-full w-full my-2 px-3 py-1 shadow-md"
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
          className="fa fa-close ml-2"
        ></i>
      </form>
    </div>
  );
};
