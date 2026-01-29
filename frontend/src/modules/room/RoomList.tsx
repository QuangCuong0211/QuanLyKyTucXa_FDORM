import { rooms, areas } from "../../services/mockData";

const RoomList = () => {
  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>Phòng</th>
          <th>Khu</th>
          <th>Sức chứa</th>
          <th>Đang ở</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map(room => {
          const area = areas.find(a => a.id === room.areaId);
          return (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{area?.name}</td>
              <td>{room.capacity}</td>
              <td>{room.currentStudents}</td>
              <td>{room.status === "available" ? "Còn chỗ" : "Đã đầy"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RoomList;
