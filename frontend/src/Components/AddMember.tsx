import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

interface MemberTypes {
  type: string;
}

const AddMember: React.FC<MemberTypes> = ({ type }) => {
  const [data, setData] = useState<Array<string>>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  let token = localStorage.getItem("token");
  token = JSON.parse(token || "{}").token;

  const getMemberData = useRef(() => {});

  getMemberData.current = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/${type}`, {
      headers: { Authorization: `Token ${token}` },
    });
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getMemberData.current();
  }, []);

  return (
    <div className="member-box">
      <h2>{type[0].toUpperCase() + type.slice(1)}</h2>
      {isLoading && <p>Loading</p>}
      {data ? (
        <ul>
          {data.map((member: any) => (
            <div className="member">
              <li key={member.id}>{member.name}</li>
              <div className="buttons">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>None Added</p>
      )}
      <button className="add-member">
        Add {type[0].toUpperCase() + type.slice(1, type.length - 1)}
      </button>
    </div>
  );
};

export default AddMember;
