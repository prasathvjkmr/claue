import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Dashboard({ setContentEditable }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(6);
  const [totalData, setTotalData] = useState(12);
  const navigate = useNavigate();
  const [deleteUserId, setDeleteUserID] = useState(1);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users?page=${page}`,
          {
            headers: { "x-api-key": `${import.meta.env.VITE_API_KEY}` },
          }
        );
        setUsers(res.data.data);
        setDataPerPage(res.data.per_page);
        setTotalData(res.data.total);
      } catch (err) {
        console.error(err);
      }
    }
    getUsers();
  }, [page]);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`, {
        headers: { "x-api-key": `${import.meta.env.VITE_API_KEY}` },
      });
      if (res.status === 204) {
        setOpen(false);
        console.log("Successfully deleted");
      }
    } catch (err) {
      console.log(err);
    }
  }
  const totalPages = Math.ceil(totalData / dataPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <>
      <h1 className="m-auto text-center font-bold mt-5 text-2xl">Users</h1>
      <ul className="m-auto my-100 mt-12 container grid grid-cols-3 gap-20">
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <div className="flex gap-3">
                <div>
                  <img
                    src={user.avatar}
                    className="rounded"
                    alt={user.first_name}
                  />
                </div>
                <div>
                  <dl className="flex flex-col justify-between gap-2 h-full block ">
                    <dt className="font-bold">
                      {user.first_name} {user.last_name}
                    </dt>
                    <dd className="font-medium">{user.email}</dd>
                    <ul className="flex justify-end gap-3 self-end">
                      <li>
                        <EyeIcon
                          aria-hidden="true"
                          className="size-8 p-1 bg-blue-200 hover:bg-blue-400 text-blue-900 hover:text-white transition m-2 border-2 border-blue-900 rounded cursor-pointer"
                          onClick={() => {
                            navigate(`/users/${user.id}`);
                            setContentEditable(false);
                          }}
                        />
                      </li>
                      <li>
                        <TrashIcon
                          aria-hidden="true"
                          className="size-8 p-1 bg-red-200 hover:bg-red-400 text-red-900 hover:text-white transition m-2 border-2 border-red-900 rounded cursor-pointer"
                          onClick={() => {
                            setDeleteUserID(user.id);
                            setOpen(true);
                          }}
                        />
                      </li>
                      <li>
                        <PencilSquareIcon
                          aria-hidden="true"
                          className="size-8 p-1 bg-green-200 hover:bg-green-400 text-green-900 hover:text-white transition m-2 border-2 border-green-900 rounded cursor-pointer"
                          onClick={() => {
                            navigate(`/users/${user.id}`);
                            setContentEditable(true);
                          }}
                        />
                      </li>
                    </ul>
                  </dl>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <Pagination
        page={page}
        dataPerPage={dataPerPage}
        totalData={totalData}
        setPage={setPage}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
      />
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Delete account
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this user? All of your
                        data will be permanently removed. This action cannot be
                        undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => deleteUser(deleteUserId)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
