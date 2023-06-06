import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
  BASE_URL,
  fetchChats,
  scrollBottom,
  axiosDelete,
  deleteSavedMessage,
} from "../utils/utils";
import { useAuth } from "./authProvider";

interface Recipient {
  _id: string;
  sender?: {
    _id: string;
  };
}

interface Group {
  _id: string;
  name: string;
  description: string;
  isPublic: boolean;
}

interface Message {
  messageId: string;
  sender?: {
    _id: string;
  };
  createdAt: string; // Add the createdAt property here
}


interface DataContextValue {
  loading: boolean;
  recipients: Recipient[];
  groups: Group[];
  messages: Message[];
  messagesLoading: boolean;
  addRecipient: (item: Recipient) => void;
  removeRecipient: (id: string) => void;
  addGroup: (item: Group) => void;
  updateGroup: (id: string, name: string, description: string, isPublic: boolean) => void;
  removeGroup: (id: string) => void;
  fetchMessages: (userId: string, recipientId: string, endpoint: string) => Promise<void>;
  addMessageCallback: (info: Message) => void;
  fetchSavedMessages: (id: string) => Promise<void>;
  messageDeleteHandler: (msg: Message) => Promise<void>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/users/recipients/${user?._id}`);
        setRecipients(res.data.recipients);
        setLoading(false);
        setLoading(true);
        const secondResponse = await axios.get(
          `${BASE_URL}/users/groups/${user?._id}`
        );
        setGroups(secondResponse.data.groups);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const addRecipient = (item: Recipient) => {
    if (recipients.findIndex((r) => r._id === item.sender?._id) === -1) {
      setRecipients((prevData) => [...prevData, item]);
    }
  };

  const removeRecipient = (id: string) => {
    setRecipients((prevData) => prevData.filter((obj) => obj._id !== id));
  };

  const addGroup = (item: Group) => {
    setGroups((prevData) => [...prevData, item]);
  };

  const updateGroup = (
    id: string,
    name: string,
    description: string,
    isPublic: boolean
  ) => {
    function callback(obj: Group) {
      if (obj._id === id) {
        obj.name = name;
        obj.description = description;
        obj.isPublic = isPublic;
      }
      return obj;
    }
    setGroups((prevState) => prevState.map(callback));
  };

  const removeGroup = (id: string) => {
    setGroups((prevData) => prevData.filter((obj) => obj._id !== id));
  };

  const fetchMessages = async (
    userId: string,
    recipientId: string,
    endpoint: string
  ) => {
    setMessagesLoading(true);
    const chats = await fetchChats(userId, recipientId, endpoint);
    setMessages(chats);
    setMessagesLoading(false);
    scrollBottom("messages");
  };

  const addMessageCallback = (info: Message) => {
    setMessages((prevState) => [...prevState, info]);
    scrollBottom("messages");
  };

  const fetchSavedMessages = async (id: string) => {
    setMessagesLoading(true);
    const { data } = await axios.get(`${BASE_URL}/users/savedMessages/${id}`);
    setMessages(data.savedMessages);
    setMessagesLoading(false);
  };

  const messageDeleteHandler = async (msg: Message) => {
    const id = msg.messageId;
    const isItSavedMessage = msg.sender ? false : true;
    setMessages((prevState) => prevState.filter((msg) => msg.messageId !== id));
    if (!isItSavedMessage) {
      await axiosDelete("messages", id);
    } else {
      await deleteSavedMessage(user, id);
    }
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        recipients,
        addRecipient,
        updateGroup,
        groups,
        addGroup,
        removeGroup,
        removeRecipient,
        fetchMessages,
        messagesLoading,
        messages,
        addMessageCallback,
        fetchSavedMessages,
        messageDeleteHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
