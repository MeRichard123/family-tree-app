import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import MemberChangeForm from "./MemberChangeForm";
import { MemberTypes } from "../Utils/Types";
import { BASE_URL } from "../Utils/store";

ReactModal.setAppElement("#root");

const AddMember: React.FC<MemberTypes> = ({ type, userId }) => {
  const [data, setData] = useState<Array<string>>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  // Force refetch after removing member, by adding to useEffect dependency
  const [deleteEvent, emitDeleteEvent] = useState<boolean>(false);
  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;

  // A Ref is used get around the use Effect is missing a dependency warning
  const getMemberData = useRef(() => {});

  const RemoveMember = async (name: string) => {
    try {
      await axios.delete(`${BASE_URL}/api/${type}/${name}`, {
        headers: { Authorization: `Token ${token}` },
      });
      emitDeleteEvent((previousEvent)=> !previousEvent )
    } catch (err) {
      console.log(err);
    }
  };

  getMemberData.current = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/${type}`, {
        headers: { Authorization: `Token ${token}` },
      });
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log("Error");
    }
  };

  useEffect(() => {
    // Mounted variable un-mounts the component so that react doesn't complain about updating
    // State of an unmounted component.
    let mounted: boolean = true;
    if (!mounted) return;
    getMemberData.current();

    return () => {
      mounted = false;
    };
  }, [modalIsOpen, deleteEvent]);

  return (
    <div className="member-box">
      <ReactModal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { zIndex: 100 },
          content: { zIndex: 100 },
        }}
      >
        <div onClick={() => setModalIsOpen(false)} className="close-btn">
          <img
            src="https://icongr.am/feather/x.svg?size=25&color=currentColor"
            alt=""
          />
        </div>
        {data && <MemberChangeForm type={type} userId={userId} />}
      </ReactModal>
      <h2>{type[0].toUpperCase() + type.slice(1)}</h2>
      {isLoading && <p>Loading</p>}
      {data.length > 0 ? (
        <ul>
          {data.map((member: any, index: number) => (
            <div className="member" key={index}>
              <li key={member.id}>{member.name}</li>
              <div className="buttons">
                <button onClick={() => RemoveMember(member.name)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>None Added</p>
      )}
      <button
        className="add-member"
        onClick={() => {
          setModalIsOpen((modalIsOpen) => !modalIsOpen);
        }}
      >
        Add {type[0].toUpperCase() + type.slice(1, type.length - 1)}
      </button>
    </div>
  );
};

export default AddMember;
