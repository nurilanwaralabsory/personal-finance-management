import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableFooter,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { Button } from "@/components/ui/button";

const TransaksiPage = () => {
  const [transaksi, setTransaksi] = useState();

  const getTransaksi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transaksi");
      setTransaksi(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTransaksi = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/transaksi/${id}`);
      getTransaksi();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteTransaksi(e.target.id);
  };

  useEffect(() => {
    getTransaksi();
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50%]'>Tanggal</TableHead>
              <TableHead className='w-[50%] text-right'>Jumlah</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transaksi &&
              transaksi.map((transaksi) => (
                <TableRow>
                  <TableCell>
                    {new Date(transaksi.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className='text-right'>
                    {transaksi.jumlah}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={handleDelete}
                      className='bg-red-500'
                      id={transaksi.id}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Sidebar>
    </div>
  );
};

export default TransaksiPage;
