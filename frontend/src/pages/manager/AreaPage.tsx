import { useEffect, useState } from "react";
import { getAreas, createArea } from "../../services/area.service";
import type { Area } from "../../types/area";

const AreaPage = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getAreas().then(setAreas);
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return alert("Nhập tên khu");
    const newArea = await createArea(name);
    setAreas([...areas, newArea]);
    setName("");
  };

  return (
    <div className="container mt-4">
      <h3>Quản lý khu</h3>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Tên khu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Thêm
        </button>
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
