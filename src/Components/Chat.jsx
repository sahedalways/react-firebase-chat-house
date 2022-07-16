import React from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

const Chat = () => {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));

  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const chatList = (id) => {
    return chats?.map((chat) => (
      <p key={Math.random()} className="text-sm font-bold text-blue-600">
        {chat.users[id]}
      </p>
    ));
  };

  chatList();

  return (
    <div>
      <div>
        <div className="relative min-h-screen flex flex-col bg-gray-50">
          {/* nav section starts from here */}
          <nav className="flex-shrink-0 bg-blue-600">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div></div>
                <div className="flex lg:hidden">
                  <button className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </button>
                </div>

                <div className="hidden lg:block lg:w-80">
                  <div className="flex items-center justify-end">
                    <div className="flex">
                      <a
                        href="#"
                        className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white"
                      >
                        Chat House
                      </a>
                    </div>

                    <div className="ml-4 relative flex-shrink-0">
                      <div>
                        <button className="lg-blue-700 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.photoURL}
                            alt=""
                          />
                        </button>
                      </div>
                    </div>

                    <div className="ml-4 relative flex-shrink-0">
                      <div>
                        <div className="flex">
                          <a
                            onClick={() => signOut(auth)}
                            href="/"
                            className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white"
                          >
                            Log Out
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          {/* nav section ends here */}

          {/* chat layout section starts from here */}

          <div className="flex-grow w-full max-w-7xl mx-auto lg:flex">
            <div className="flex-1 min-w-0 bg-white xl:flex">
              <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50">
                <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  <div className="h-full relative">
                    <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 mb-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={user.photoURL}
                          alt={user.displayName}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <a href="#" className="focus:outline-none">
                          <span className="absolute inset-0"></span>
                          <p className="text-sm font-bold text-blue-600">
                            {user.displayName}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            Marketing Manager
                          </p>
                        </a>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          name="search"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-100 rounded-full p-2 border"
                        />
                      </div>
                    </div>

                    <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                          alt=""
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <a href="#" className="focus:outline-none">
                          <div className="flex items-center justify-between">
                            {chatList([0])}
                            <div className="text-gray-400 text-xs">
                              12:35 AM
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500 truncate">
                              Hi
                            </div>
                            <div className="text-white text-xs bg-blue-400 rounded-full px-1 py-0">
                              2
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                          alt=""
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <a href="#" className="focus:outline-none">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-blue-600">
                              {chatList([1])}
                            </p>
                            <div className="text-gray-400 text-xs">
                              10:35 AM
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500 truncate">
                              How are you, Sahed?
                            </div>
                            <div className="text-white text-xs bg-blue-400 rounded-full px-1 py-0">
                              3
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* middle chat contents starts from here */}

              <div className="flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen hidden xl:flex">
                <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor pointer"
                      alt=""
                    />

                    <div className="flex flex-col leading-tight">
                      <div className="text-1xl mt-1 flex items-center">
                        <span className="text-gray-700 mr-3">
                          {chatList([1])}
                        </span>
                        <span className="text-green-500">
                          <svg width={10} height={10}>
                            <circle cx={5} cy={5} r={5} fill="currentColor" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <button className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* messages area starts from here */}
                <div
                  id="messages"
                  className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                >
                  {/* first message */}
                  <div className="chat-message">
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-XS max-w-XS mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                            Lorem, ipsum.
                          </span>
                        </div>
                      </div>

                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="w-6 h-6 rounded-full order-1"
                        alt=""
                      />
                    </div>
                  </div>
                  {/* second message */}
                  <div className="chat-message">
                    <div className="flex items-end justify-end">
                      <div className="flex flex-col space-y-2 text-XS max-w-XS mx-2 order-2 items-end">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-200 text-white-600">
                            Lorem, ipsum2.
                          </span>
                        </div>
                      </div>

                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="w-6 h-6 rounded-full order-1"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="chat-message">
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-XS max-w-XS mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                            Lorem, ipsum.
                          </span>
                        </div>
                      </div>

                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="w-6 h-6 rounded-full order-1"
                        alt=""
                      />
                    </div>
                  </div>{" "}
                  <div className="chat-message">
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-XS max-w-XS mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                            Lorem, ipsum.
                          </span>
                        </div>
                      </div>

                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="w-6 h-6 rounded-full order-1"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="chat-message">
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-XS max-w-XS mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600">
                            Lorem, ipsum.
                          </span>
                        </div>
                      </div>

                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        className="w-6 h-6 rounded-full order-1"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {/* messages area ends here */}

                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 mb-16">
                  <div className="relative flex">
                    <span className="absolute inset-y-0 flex items-center">
                      <button className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          class="bi bi-mic"
                          viewBox="0 0 16 16"
                          className="h-6 w-6 text-gray-600"
                        >
                          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                          <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                        </svg>
                      </button>
                    </span>
                    <input
                      placeholder="Write something..."
                      className="focus:ring-blue-500 focus:border-blue-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden xl:block">
                <div className="h-full pl-6 py-6 lg:w-80">
                  <div className="h-full relative">
                    <div className="m-auto text-center mb-10">
                      <img
                        src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        className="w-36 h-36 rounded-full m-auto"
                        alt=""
                      />

                      <h2 className="m-auto text-2xl mt-2">{chatList([1])}</h2>
                    </div>

                    <div className="mb-2">
                      <h4>Attachments</h4>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                      </div>

                      <div>
                        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                      </div>

                      <div>
                        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                      </div>

                      <div>
                        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                      </div>

                      <div>
                        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                      </div>

                      <div>
                        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                      </div>

                      <div>
                        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                      </div>

                      <div>
                        <div className="cursor-pointer bg-gray-300 hover:bg-gray-400 h-14 w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
