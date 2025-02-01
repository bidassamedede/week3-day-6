import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./config";

const App: React.FC = () => {
  const [students, setStudents] = useState<{ id: number; name: string }[]>([]);
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  
  useEffect(() => {
    const connectWallet = async () => {
      try {
        const { ethereum } = window as any;
        if (!ethereum) {
          alert("MetaMask is required");
          return;
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        setContract(contractInstance);
        fetchStudents(contractInstance);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    };

    connectWallet();
  }, []);

  const fetchStudents = async (contract: ethers.Contract) => {
    try {
      const [ids, names] = await contract.getAllStudents();
      const studentList = ids.map((id: any, index: number) => ({
        id: Number(id),
        name: names[index],
      }));
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const registerStudent = async () => {
    if (!contract || !studentId || !studentName) return;
    try {
      const tx = await contract.registerStudent(Number(studentId), studentName);
      await tx.wait();
      await fetchStudents(contract);
    } catch (error) {
      console.error("Error registering student:", error);
    }
  };

  const removeStudent = async (id: number) => {
    if (!contract) return;
    try {
      const tx = await contract.removeStudent(id);
      await tx.wait();
      await fetchStudents(contract);
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Class Registration</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Student ID"
          className="border p-2 mr-2"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student Name"
          className="border p-2 mr-2"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={registerStudent}>
          Register
        </button>
      </div>

      <h2 className="text-2xl mb-4">Registered Students</h2>
      <ul className="bg-white shadow-md p-4 w-full max-w-md">
        {students.map((student) => (
          <li key={student.id} className="flex justify-between p-2 border-b">
            {student.id} - {student.name}
            <button className="bg-red-500 text-white px-2 py-1" onClick={() => removeStudent(student.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
