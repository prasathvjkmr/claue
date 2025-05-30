import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Profile(props) {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${id}`,
          {
            headers: { "x-api-key": `${import.meta.env.VITE_API_KEY}` },
          }
        );
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (id) getUser();
  }, [id]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${id}`,
        {
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          email: e.target.email.value,
        },
        {
          headers: { "x-api-key": `${import.meta.env.VITE_API_KEY}` },
        }
      );
      setUser({
        ...user,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
      });
      if (res.status === 200) {
        console.log(res.data);
      }
      alert("Profile updated!");
    } catch (error) {
      alert("Failed to update profile.");
      console.log(error);
    }
  };

  if (!user) return <div className="text-center mt-20">Loading...</div>;

  return props.contentEditable === true ? (
    <form className="container mx-auto my-10" onSubmit={submitHandler}>
      <div className="flex gap-20 bg-green-50 border-2 rounded-xl p-20">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="rounded w-[120px]"
        />
        <dl className="block">
          <dd className="text-5xl">{user.id}</dd>
          <dt>
            <input
              name="first_name"
              defaultValue={user.first_name}
              className="border rounded px-2 py-1 m-2"
            />
            <input
              name="last_name"
              defaultValue={user.last_name}
              className="border rounded px-2 py-1 m-2"
            />
          </dt>
          <dd>
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              className="border rounded px-2 py-1 m-2"
            />
          </dd>
        </dl>
      </div>
      <div className="text-right mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  ) : (
    <div className="container mx-auto my-10">
      <div className="flex gap-20 bg-green-50 border-2 rounded-xl p-20">
        <img
          src={user.avatar}
          alt={user.first_name}
          className="rounded w-[120px]"
        />
        <dl className="block">
          <dd className="text-5xl">{user.id}</dd>
          <dt>
            {user.first_name} {user.last_name}
          </dt>
          <dd>{user.email}</dd>
        </dl>
      </div>
    </div>
  );
}
