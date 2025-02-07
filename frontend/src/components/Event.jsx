/* eslint-disable react/prop-types */
export default function Event({ event, children }) {
  return (
    <div className="w-full bg-indigo-700 rounded-lg shadow-lg p-5 overflow-hidden hover:overflow-auto">
      <div className="flex w-full justify-between items-center text-sm font-bold">
        <p className="uppercase text-green-400 tracking-widest">
          {new Date(event.createdAt).toLocaleDateString()}
        </p>
        <div>{children}</div>
      </div>
      <h3 className="text-2xl font-extrabold text-indigo-50 leading-snug mb-2">
        {event.title}
      </h3>
      <p className="text-indigo-200">{event.body}</p>
      <p className="text-indigo-200">{event.date}</p>
    </div>
  );
}
