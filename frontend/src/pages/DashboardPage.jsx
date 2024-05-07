import { Fragment, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";

const DashboardPage = () => {
  const [transaksi, setTransaksi] = useState();
  const [pemasukan, setPemasukan] = useState();
  const [totalPemasukan, setTotalPemasukan] = useState();
  const [totalPengeluaran, setTotalPengeluaran] = useState();
  const [pengeluaran, setPengeluaran] = useState();
  const [dbUser, setDbUser] = useState();
  const [jumlahSaldo, setJumlahSaldo] = useState();
  const [formData, setFormData] = useState();
  const [open, setOpen] = useState();
  const [anggaran, setAnggaran] = useState("");
  const [kategori, setKategori] = useState();
  const [jumlahAnggaran, setJumlahAnggaran] = useState();

  const getKategori = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kategori");
      setKategori(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getKategori();
  }, []);

  useEffect(() => {
    setJumlahSaldo(totalPemasukan - totalPengeluaran);
  }, [totalPemasukan, totalPengeluaran]);

  const updateSaldo = async () => {
    try {
      await axios.patch("http://localhost:5000/users/2", {
        saldo: jumlahSaldo,
      });
      getUserById();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (jumlahSaldo) {
      updateSaldo();
    }
  }, [jumlahSaldo]);

  useEffect(() => {
    if (pengeluaran) {
      const total = pengeluaran.reduce((acc, obj) => {
        return acc + parseFloat(obj.jumlah);
      }, 0);
      setTotalPengeluaran(total);
    }
  }, [pengeluaran]);

  useEffect(() => {
    if (pemasukan) {
      const total = pemasukan.reduce((acc, obj) => {
        return acc + parseFloat(obj.jumlah);
      }, 0);
      setTotalPemasukan(total);
    }
  }, [pemasukan]);

  const getPemasukan = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/transaksi/kategori/1"
      );
      setPemasukan(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPengeluaran = async () => {
    try {
      const pengeluaran = await axios.get(
        "http://localhost:5000/transaksi/kategori/2"
      );
      setPengeluaran(pengeluaran.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPemasukan();
    getPengeluaran();
  }, []);

  const getUserById = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/2");
      setDbUser(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createTransaksi = async () => {
    try {
      anggaran.map((angg) => {
        if (formData.jumlah > angg.jumlah) {
          return console.log("Jumlah melebihi anggaran");
        }
      });
      await axios.post("http://localhost:5000/transaksi", {
        ...formData,
        jumlah: formData.jumlah,
        kategori_id: formData.kategori,
        deskripsi: formData.deskripsi,
      });
      getPemasukan();
      getPengeluaran();
      getTransaksi();
      toast("Event has been created.", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    getUserById();
  }, []);

  const getTransaksi = async () => {
    try {
      const transaksi = await axios.get("http://localhost:5000/transaksi");
      setTransaksi(transaksi.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTransaksi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTransaksi();
    setOpen(false);
  };

  const deleteTransaksi = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/transaksi/${id}`);
      getPemasukan();
      getPengeluaran();
      getTransaksi();
      toast("Event has been created.", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteTransaksi(e.target.id);
  };

  const [subKategori, setSubKategori] = useState();

  const getSubKategori = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subkategori");
      setSubKategori(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSubKategori();
  }, []);

  const rupiah = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const getAnggaran = async () => {
    try {
      const response = await axios.get("http://localhost:5000/anggaran");
      setAnggaran(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAnggaran();
  }, []);

  const updateTransaksi = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/transaksi/${id}`, {
        jumlah: formData.jumlah,
        kategori_id: formData.kategori,
        deskripsi: formData.deskripsi,
      });
      getTransaksi();
      getPemasukan();
      getPengeluaran();
      toast("Event has been created.", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTransaksi(e.target.id);
    console.log(e.target.id);
  };

  return (
    <>
      <Navbar>
        {dbUser && (
          <Fragment key={dbUser.id}>
            <span className='text-[15px] text-end'>{dbUser.name}</span>
            <span className='text-[12px] text-end'>
              {rupiah.format(dbUser.saldo)}
            </span>
          </Fragment>
        )}
      </Navbar>
      <Sidebar>
        <Tabs defaultValue='this-month' className=''>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='anggaran'>Anggaran</TabsTrigger>
            <TabsTrigger value='this-month'>This Month</TabsTrigger>
            <TabsTrigger value='future'>Future</TabsTrigger>
          </TabsList>
          <TabsContent value='anggaran'>
            <Card>
              <CardHeader>
                <CardTitle>Anggaran</CardTitle>
                <CardDescription>Tabel anggaranmu ada disini!</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[100px]'>No.</TableHead>
                      <TableHead className='w-[50%]'>Nama Anggaran</TableHead>
                      <TableHead className='text-right w-full'>
                        Jumlah
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {anggaran &&
                      anggaran.map((angg) => {
                        if (angg === 0) {
                          return (
                            <p className='text-center text-red-500'>No data</p>
                          );
                        } else {
                          return (
                            <TableRow>
                              <TableCell>1</TableCell>
                              <TableCell>{angg.name}</TableCell>
                              <TableCell className='text-right'>
                                {rupiah.format(angg.jumlah)}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='this-month'>
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
                <CardDescription>Your finances in this month</CardDescription>
              </CardHeader>
              <CardContent className='space-y-2 flex justify-between'>
                <Table>
                  <TableCaption>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button variant='link' className='bg-green-500'>
                          <span className='text-lg text-white'>+</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='sm:max-w-[450px]'>
                        <Tabs defaultValue='account' className='w-[400px]'>
                          <TabsList className='grid w-full grid-cols-2'>
                            <TabsTrigger value='account'>Pemasukan</TabsTrigger>
                            <TabsTrigger value='password'>
                              Pengeluaran
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value='account'>
                            <form onSubmit={handleSubmit}>
                              <Card>
                                <CardHeader>
                                  <CardTitle>Pemasukan</CardTitle>
                                </CardHeader>
                                <CardContent className='space-y-2'>
                                  <div className='space-y-1'>
                                    <Label htmlFor='name'>Jumlah</Label>
                                    <Input
                                      id='jumlah'
                                      name='jumlah'
                                      placeholder='Rp.'
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className='space-y-1'>
                                    <label
                                      htmlFor='kategori'
                                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                      Kategori
                                    </label>
                                    <select
                                      id='kategori'
                                      name='kategori'
                                      onChange={handleChange}
                                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    >
                                      {/* <option defaultValue={true}>
                                        Choose a country
                                      </option> */}
                                      <option selected disabled>
                                        Pilih kategori
                                      </option>
                                      {subKategori &&
                                        subKategori.map((subk) => {
                                          if (subk.kategori_id === 1) {
                                            return (
                                              <option value={subk.kategori_id}>
                                                {subk.name}
                                              </option>
                                            );
                                          }
                                        })}
                                    </select>
                                  </div>
                                  <div className='space-y-2'>
                                    <Label htmlFor='deskripsi'>Deskripsi</Label>
                                    <Textarea
                                      id='deskripsi'
                                      name='deskripsi'
                                      placeholder='Deskripsi'
                                      onChange={handleChange}
                                    />
                                  </div>
                                </CardContent>
                                <CardFooter>
                                  <Button type='submit'>Save</Button>
                                </CardFooter>
                              </Card>
                            </form>
                          </TabsContent>
                          <TabsContent value='password'>
                            <form onSubmit={handleSubmit}>
                              <Card>
                                <CardHeader>
                                  <CardTitle>Pengeluaran</CardTitle>
                                </CardHeader>
                                <CardContent className='space-y-2'>
                                  <div className='space-y-1'>
                                    <Label htmlFor='name'>Jumlah</Label>
                                    <Input
                                      id='jumlah'
                                      name='jumlah'
                                      placeholder='Rp.'
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className='space-y-1'>
                                    <label
                                      htmlFor='kategori'
                                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                      Kategori
                                    </label>
                                    <select
                                      id='kategori'
                                      name='kategori'
                                      onChange={handleChange}
                                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    >
                                      <option selected disabled>
                                        Pilih kategori
                                      </option>
                                      {subKategori &&
                                        subKategori.map((subk) => {
                                          if (subk.kategori_id === 2) {
                                            return (
                                              <option value={subk.kategori_id}>
                                                {subk.name}
                                              </option>
                                            );
                                          }
                                        })}
                                    </select>
                                  </div>
                                  <div className='space-y-2'>
                                    <Label htmlFor='deskripsi'>Deskripsi</Label>
                                    <Textarea
                                      id='deskripsi'
                                      name='deskripsi'
                                      placeholder='Deskripsi'
                                      onChange={handleChange}
                                    />
                                  </div>
                                </CardContent>
                                <CardFooter>
                                  <Button type='submit'>Save changes</Button>
                                </CardFooter>
                              </Card>
                            </form>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Inflow</TableCell>
                      <TableCell
                        colSpan={3}
                        className='text-right text-green-500'
                      >
                        {rupiah.format(totalPemasukan)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Outflow</TableCell>
                      <TableCell
                        colSpan={3}
                        className='text-right text-red-500'
                      >
                        {rupiah.format(totalPengeluaran)}
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className='text-right'>
                        {rupiah.format(jumlahSaldo)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
              <Card className='rounded-none mt-5'>
                <CardHeader>
                  <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[30%]'>Tanggal</TableHead>
                        <TableHead className='w-[30%]'>Kategori</TableHead>
                        <TableHead className='w-[50%]'>Deskripsi</TableHead>
                        <TableHead className='w-[50%] text-right'>
                          Jumlah
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    {transaksi &&
                      transaksi.map((trans) => {
                        const date = new Date(trans.createdAt);
                        const formatTanggal = date.toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        });
                        const rupiah = new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(trans.jumlah);
                        return (
                          <TableBody>
                            <TableRow>
                              <TableCell>{formatTanggal}</TableCell>
                              <TableCell>
                                {trans.kategori_id === 1 ? (
                                  <span className='text-green-500'>
                                    Pemasukan
                                  </span>
                                ) : (
                                  <span className='text-red-500'>
                                    Pengeluaran
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>{trans.deskripsi}</TableCell>
                              <TableCell className='text-right'>
                                <span
                                  className={
                                    trans.kategori_id === 1
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }
                                >
                                  {" "}
                                  {rupiah}
                                </span>
                              </TableCell>
                              <TableCell>
                                <AlertDialog key={trans.id}>
                                  <AlertDialogTrigger asChild>
                                    <Button className='bg-red-500'>
                                      Delete
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you absolutely sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        id={trans.id}
                                        onClick={handleDelete}
                                      >
                                        Continue
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TableCell>
                              <TableCell>
                                <Dialog key={trans.id}>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant='outline'
                                      className='bg-green-500 text-white'
                                    >
                                      Edit
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent
                                    className='sm:max-w-[425px]'
                                    id={trans.id}
                                  >
                                    <form onSubmit={handleUpdate} id={trans.id}>
                                      <DialogHeader>
                                        <DialogTitle>
                                          Edit transaksi
                                        </DialogTitle>
                                        <DialogDescription>
                                          Make changes to your transaction here.
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className='grid gap-4 py-4'>
                                        <div className=''>
                                          <Label
                                            htmlFor='jumlah'
                                            className='text-right'
                                          >
                                            Jumlah
                                          </Label>
                                          <Input
                                            id='jumlah'
                                            name='jumlah'
                                            defaultValue={trans.jumlah}
                                            className='col-span-3'
                                            onChange={handleChange}
                                          />
                                        </div>
                                        <div className=''>
                                          <Label
                                            htmlFor='kategori'
                                            className='text-right'
                                          >
                                            Kategori
                                          </Label>
                                          <select
                                            id='kategori'
                                            name='kategori'
                                            onChange={handleChange}
                                            class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                          >
                                            <option disabled>
                                              Choose a country
                                            </option>
                                            {kategori &&
                                              kategori.map((kat) => {
                                                return (
                                                  <option
                                                    selected={
                                                      trans.kategori_id ==
                                                      kat.id
                                                        ? true
                                                        : false
                                                    }
                                                    value={kat.id}
                                                  >
                                                    {kat.name}
                                                  </option>
                                                );
                                              })}
                                          </select>
                                        </div>
                                        <div className=''>
                                          <Label
                                            htmlFor='deskripsi'
                                            className='text-right'
                                          >
                                            Deskripsi
                                          </Label>
                                          <Textarea
                                            placeholder='Type your description here.'
                                            id='deskripsi'
                                            name='deskripsi'
                                            onChange={handleChange}
                                            defaultValue={trans.deskripsi}
                                          />
                                        </div>
                                      </div>
                                      <Button type='submit' id={trans.id}>
                                        Save
                                      </Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        );
                      })}
                  </Table>
                </CardHeader>
              </Card>
            </Card>
          </TabsContent>
        </Tabs>
        <Toaster />
      </Sidebar>
    </>
  );
};

export default DashboardPage;
