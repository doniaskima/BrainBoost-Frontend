import { useState } from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";

const CreateGroupForm = ({setShowCreateGroupForm}) => {
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
  return (
    <div className="w-full px-2 mb-2">
              {error !== "" && <p className="text-red-500 text-center">{error}</p>}
              <form action="">
                <div>
                    <input type="text" 
                    className="rounded-full w-full my-2 px-3 py-1 shadow-md"
                    placeholder="Grpoup Name"
                    value={name}
                    onChange={(e) => {
                        setError("");
                        setName(e.target.value);
                      }}
                  />
                </div>
                <div>
                    <input type="text" 
                    className="rounded-full w-full my-2 px-3 py-1 shadow-md"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    />
                     <button
          type="submit"
          disabled={name === ""}
          className={`bg-white rounded-full px-3 py-1 shadow-md ${
            name !== "" ? "cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          Create
        </button>
        <AiOutlineCloseCircle
        onClick={() => setShowCreateGroupForm(false)}
        className="ml-2"
        />
                </div>
              </form>
    </div>
  )
};

export default CreateGroupForm;
