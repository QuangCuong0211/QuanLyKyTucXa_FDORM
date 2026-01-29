import { useState } from "react";
import type { Area } from "../types/area";
import { getAreas, addArea } from "../services/areaService";

const AreaPage = () => {
  const [areas, setAreas] = useState<Area[]>(getAreas());
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = () => {
    if (!name) return;
    const newArea = addArea({ name, description: desc });
    setAreas([...areas, newArea]);
    setName("");
    setDesc("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý khu ký túc xá</h2>

      <input
        placeholder="Tên khu"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Mô tả"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={handleAdd}>Thêm khu</button>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên khu</th>
            <th>Mô tả</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>{a.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AreaPage;
