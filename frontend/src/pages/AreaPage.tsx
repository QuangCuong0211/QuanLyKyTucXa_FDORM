import { useState } from "react";
import { getAreas, createArea } from "../services/area.service";
import type { Area } from "../types/area";

const AreaPage = () => {
  const [areas, setAreas] = useState<Area[]>(getAreas());
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return alert("Nhập tên khu");
    const newArea = createArea({ name });
    setAreas([...areas, newArea]);
    setName("");
  };

  return (
    <div className="container mt-4">
      <h3>Quản lý khu</h3>

      <div className="row g-2 mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Tên khu"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleAdd}>
            Thêm
          </button>
        </div>
      </div>

      <ul className="list-group">
        {areas.map((a) => (
          <li key={a.id} className="list-group-item">
            {a.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AreaPage;
