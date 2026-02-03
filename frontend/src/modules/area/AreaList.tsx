import { areas } from "../../services/mockData";

const AreaList = () => {
  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên khu</th>
          <th>Mô tả</th>
        </tr>
      </thead>
      <tbody>
        {areas.map(area => (
          <tr key={area.id}>
            <td>{area.id}</td>
            <td>{area.name}</td>
            <td>{area.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AreaList;
