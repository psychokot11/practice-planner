function UserAvatar() {
  return (
    <div className="text-neutral-500 hover:text-neutral-600 flex gap-5 items-center font-medium text-2xl">
      <img
        src="default-user.jpg"
        alt="user avatar"
        className="w-16 block aspect-square object-cover rounded-full object-center outline outline-2 outline-neutral-100"
      />
      <span>username</span>
    </div>
  );
}

export default UserAvatar;
