import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function Page({ stars }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios("/api/users").then(({ data }) => {
      setUsers(data);
    });
  }, []);
  return (
    <div>
      {users.map(user => {
        return (
          <div>
            <p>{user.name}</p>
            <Link href={"/users/" + user._id}>
              <a>book slot</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Page;
