function UserAvatar() {
  return (
    <button disabled className="text-neutral-500 hover:text-neutral-600 flex gap-2 items-center font-medium text-2xl">
      <img
        src="default-user.jpg"
        alt="user avatar"
        className="h-8 block aspect-square object-cover rounded-full object-center outline outline-2 outline-neutral-100"
      />
      <span className="text-sm md:text-lg lg:text-xl">username</span>
    </button>
  );
}

export default UserAvatar;
