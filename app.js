const readline = require("readline");
const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table')
const dbFile = "./university.db"
const db = new sqlite3.Database(dbFile);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


class Mahasiswa {
    constructor() {
        this.acces = ""
        this.nama = ""
        this.level = ""
    }

    logIn() {
        let that = this
        console.log(`=========================================================================================================================================================\n                                                         Welcome to Institut Teknologi Bandung\n                                                                  Jl Ganesha No. 10\n=========================================================================================================================================================`)
        rl.question("Username :", (username) => {
            rl.question("password :", function (pass) {
                let userName = username.trim()
                let trimedPass = pass.trim()

                db.serialize(function () {
                    let query = `SELECT * FROM anggota WHERE userName =?`

                    db.get(query, [userName], (err, rows) => {

                        if (err) {
                            throw err
                        }
                        if (!rows) {
                            console.log("Username tidak ditemukan!\n")
                            that.logIn()
                        } else if (rows.pass === trimedPass) {
                            that.nama = userName
                            that.level = rows.stat
                            that.mainMenu()
                        } else {
                            console.log("Password yang anda masukan salah!")
                            that.logIn()
                        }
                    })
                })

            })

        })
    }
    mainMenu() {
        let that = this
        console.log(`\n=========================================================================================================================================================`)
        console.log(`Welcome, ${that.nama}. Your acces level is: ${that.level}\n=========================================================================================================================================================`) //DONT FORGET TO CHANGE THIS
        console.log(`Silahkan pilih opsi di bawah ini\n[1] Mahasiswa\n[2] Jurusan\n[3] Dosen\n[4] Mata Kuliah\n[5] Kontrak\n[6] keluar`)
        console.log(`=========================================================================================================================================================`)
        rl.question("Masukan salah satu no. dari opsi diatas:", (answer) => {
            let choice = answer.trim()
            if (choice === "1") {
                that.acces = "mahasiswa"
                that.universityAcces()
            }
            else if (choice === "2") {
                that.acces = "jurusan"
                that.universityAcces()
            } else if (choice === "3") {
                that.acces = "dosen"
                that.universityAcces()
            } else if (choice === "4") {
                that.acces = "mata kuliah"
                that.universityAcces()
            } else if (choice === "5") {
                that.acces = "kontrak"
                that.universityAcces()
            } else {
                rl.close()
            }

        })
    }
    fiturMahasiswa() {
        console.log(`Silahkan pilih opsi di bawah ini\n[1] Daftar Murid\n[2] Cari Murid\n[3] Tambah Murid\n[4] Hapus Murid\n[5] Kembali`)
        console.log(`=========================================================================================================================================================`)
    }
    fiturDosen() {
        console.log(`Silahkan pilih opsi di bawah ini\n[1] Daftar Dosen\n[2] Cari Dosen\n[3] Tambah Dosen\n[4] Hapus Dosen\n[5] Kembali`)
        console.log(`=========================================================================================================================================================`)
    }
    fiturJurusan() {
        console.log(`Silahkan pilih opsi di bawah ini\n[1] Daftar Jurusan\n[2] Cari Jurusan\n[3] Tambah Jurusan\n[4] Hapus Jurusan\n[5] Kembali`)
        console.log(`=========================================================================================================================================================`)
    }
    fiturDosen() {
        console.log(`Silahkan pilih opsi di bawah ini\n[1] Daftar Dosen\n[2] Cari Dosen\n[3] Tambah Dosen\n[4] Hapus Dosen\n[5] Kembali`)
        console.log(`=========================================================================================================================================================`)
    }
    fiturMataKuliah() {
        console.log(`Silahkan pilih opsi di bawah ini\n[1] Daftar Mata Kuliah\n[2] Cari Mata Kuliah\n[3] Tambah Mata Kuliah\n[4] Hapus Mata Kuliah\n[5] Kembali`)
        console.log(`=========================================================================================================================================================`)
    }
    fiturKontrak() {
        console.log(`Silahkan pilih opsi di bawah ini\n[1] Daftar Kontrak\n[2] Cari Kontrak\n[3] Tambah Kontrak\n[4] Hapus Kontrak\n[5] Kembali`)
        console.log(`=========================================================================================================================================================`)
    }

    universityAcces() {
        let that = this

        if (that.acces === "mahasiswa") this.fiturMahasiswa()
        if (that.acces === "jurusan") this.fiturJurusan()
        if (that.acces === "dosen") this.fiturDosen()
        if (that.acces === "mata kuliah") this.fiturMataKuliah()
        if (that.acces === "kontrak") this.fiturKontrak()

        rl.question("Masukan salah satu no. dari opsi diatas:", (answer) => {
            let choice = answer.trim()
            if (choice === "1") {
                that.getAll()
            }
            else if (choice === "2") {
                that.search()
            }
            else if (choice === "3") {
                that.insertData()
            } else if (choice === "4") {
                that.deleteData()
            } else if (choice === "5") {
                that.mainMenu()
            }

        })
    }
    getAll() {
        let that = this
        if (that.acces === "mahasiswa") {
            db.serialize(function () {
                let sql = `SELECT * FROM Mahasiswa;`
                var table = new Table({
                    head: ['NIM', 'Nama', 'Alamat', 'Jurusan']
                    , colWidths: [25, 25, 30, 25]
                });
                db.all(sql, (err, rows) => {

                    if (err) throw err
                    if (rows) {

                        rows.forEach(row => {
                            table.push([row.nim, row.nama_Mahasiswa, row.alamat, row.jurusan])
                        })
                        console.log("=========================================================================================================================================================")
                        console.log(table.toString())
                        that.universityAcces()
                    }else{
                        console.log("tidak ada hasil")
                    }
                })
            })
        }
        if (that.acces === "jurusan") {
            db.serialize(function () {
                let sql = `SELECT * FROM Jurusan;`
                var table = new Table({
                    head: ['Kode Jurusan', 'Nama Jurusan']
                    , colWidths: [30, 30]
                });
                db.all(sql, (err, rows) => {

                    if (err) throw err
                    if (rows) {

                        rows.forEach(row => {
                            table.push([row.Kode_Jurusan, row.Nama_Jurusan])
                        })
                        console.log("=========================================================================================================================================================")
                        console.log(table.toString())
                        that.universityAcces()
                    } else {
                        console.log("tidak ada hasil")
                    }
                })
            })
        }
        if (that.acces === "dosen") {
            db.serialize(function () {
                let sql = `SELECT * FROM Dosen;`
                var table = new Table({
                    head: ['NIP', 'Nama Dosen']
                    , colWidths: [30, 30]
                });
                db.all(sql, (err, rows) => {

                    if (err) throw err
                    if (rows) {

                        rows.forEach(row => {
                            table.push([row.Nip, row.Nama_Dosen])
                        })
                        console.log("=========================================================================================================================================================")
                        console.log(table.toString())
                        that.universityAcces()
                        // console.log("==========================================================================================================")
                    } else {
                        console.log("tidak ada hasil")
                    }
                })
            })
        }
        if (that.acces === "mata kuliah") {
            db.serialize(function () {
                let sql = `SELECT * FROM MataKuliah;`
                var table = new Table({
                    head: ['Kode Mata Kuliah', 'Nama Mata kuliah', "SKS"]
                    , colWidths: [35, 35, 35]
                });
                db.all(sql, (err, rows) => {

                    if (err) throw err
                    if (rows) {

                        rows.forEach(row => {
                            table.push([row.Id_Matkul, row.Nama_Matkul, row.Sks])
                        })
                        console.log("=========================================================================================================================================================")
                        console.log(table.toString())
                        that.universityAcces()
                    } else {
                        console.log("tidak ada hasil")
                    }
                })
            })
        }
        if (that.acces === "kontrak") {
            db.serialize(function () {
                let sql = `SELECT * FROM Krs;`
                var table = new Table({
                    head: ['NIM', "Kode Mata Kuliah", "ID Dosen", "Nilai"]
                    , colWidths: [35, 35, 35, 35]
                });
                db.all(sql, (err, rows) => {

                    if (err) throw err
                    if (rows) {

                        rows.forEach(row => {
                            table.push([row.Nim, row.Id_Matkul, row.Id_Dosen, row.Nilai])
                        })
                        console.log("==========================================================================================================")
                        console.log(table.toString())
                        that.universityAcces()
                    } else {
                        console.log("tidak ada hasil")
                    }
                })
            })
        }

    }
    search() {
        let that = this
        if (that.acces === "mahasiswa") {
            console.log(`=========================================================================================================================================================`)
            rl.question("Masukan NIM:", (answer) => {
                db.serialize(function () {
                    let query = `SELECT * FROM Mahasiswa WHERE nim =?`
                    db.get(query, [answer.trim()], (err, rows) => {
                        if (err) throw err
                        if (rows) {
                            const { nim, nama_Mahasiswa, alamat, jurusan } = rows
                            console.log(`=========================================================================================================================================================`)
                            console.log("Student Details")
                            console.log(`=========================================================================================================================================================`)
                            console.log(`Id           :${nim}\nNama         :${nama_Mahasiswa}\nAlamat       :${alamat}\nJurusan      :${jurusan}`)
                            console.log(`=========================================================================================================================================================`)
                            that.universityAcces()
                        } else {
                            console.log(`Mahasiswa dengan NIM ${answer} tidak ditemukan!`)
                            that.search()
                        }
                    })
                })
            })
        }
        if (that.acces === "jurusan") {
            console.log(`=========================================================================================================================================================`)
            rl.question("Masukan Jurusan:", (answer) => {
                db.serialize(function () {
                    let query = `SELECT * FROM Jurusan WHERE Nama_Jurusan =?`

                    db.get(query, [answer.trim()], (err, rows) => {
                        if (err) throw err

                        if (rows) {
                            const { Kode_Jurusan, Nama_Jurusan } = rows
                            console.log(`=========================================================================================================================================================`)
                            console.log("Departement Details")
                            console.log(`=========================================================================================================================================================`)
                            console.log(`Kode Jurusan           :${Kode_Jurusan}\nNama Jurusan           :${Nama_Jurusan}`)
                            console.log(`=========================================================================================================================================================`)
                            that.universityAcces()
                        } else {
                            console.log(`Jurusan dengan nama Jurusan ${answer} tidak ditemukan!`)

                            that.search()
                        }
                    })
                })
            })
        }
        if (that.acces === "dosen") {
            console.log(`=========================================================================================================================================================`)
            rl.question("Masukan NIP:", (answer) => {

                db.serialize(function () {
                    let query = `SELECT * FROM Dosen WHERE Nip =?`

                    db.get(query, [answer.trim()], (err, rows) => {
                        if (err) throw err

                        if (rows) {
                            const { Nip, Nama_Dosen } = rows
                            console.log(`=========================================================================================================================================================`)
                            console.log("Instructor Details")
                            console.log(`=========================================================================================================================================================`)
                            console.log(`NIP                :${Nip}\nNama Dosen         :${Nama_Dosen}`)
                            console.log(`=========================================================================================================================================================`)
                            that.universityAcces()
                        } else {
                            console.log(`Dosen dengan NIP ${answer} tidak ditemukan!`)

                            that.search()
                        }
                    })
                })
            })
        }
        if (that.acces === "mata kuliah") {
            console.log(`=========================================================================================================================================================`)
            rl.question("Masukan Mata Kuliah:", (answer) => {

                db.serialize(function () {
                    let query = `SELECT * FROM MataKuliah WHERE Nama_Matkul =?`

                    db.get(query, [answer.trim()], (err, rows) => {
                        if (err) throw err

                        if (rows) {
                            const { Id_Matkul, Nama_Matkul, Sks } = rows
                            console.log(`=========================================================================================================================================================`)
                            console.log("Course Details")
                            console.log(`=========================================================================================================================================================`)
                            console.log(`Kode Mata Kuliah           :${Id_Matkul}\nNama Jurusan               :${Nama_Matkul}\nJumlah SKS                 :${Sks}`)
                            console.log(`=========================================================================================================================================================`)
                            that.universityAcces()
                        } else {
                            console.log(`Mata kuliah dengan nama ${answer} tidak ditemukan!`)

                            that.search()
                        }
                    })
                })
            })
        }
        if (that.acces === "kontrak") {
            console.log(`=========================================================================================================================================================`)
            rl.question("Masukan NIM:", (answer) => {

                db.serialize(function () {
                    let query = `SELECT * FROM Krs WHERE Nim =?`
                    var table = new Table({
                        head: ['NIM', 'Kode Mata Kuliah', 'NIP Dosen', 'Nilai']
                        , colWidths: [25, 25, 25, 25]
                    });
                    db.all(query, [answer.trim()], (err, rows) => {
                        if (err) throw err

                        if (rows) {
                            rows.forEach(row => {
                                table.push([row.Nim, row.Id_Matkul, row.Id_Dosen, row.Nilai])
                            })
                            console.log(table.toString())
                            that.universityAcces()
                        } else {
                            console.log(`KRS dengan NIM ${answer} tidak ditemukan!`)

                            that.search()
                        }
                    })
                })
            })
        }

    }
    insertData() {
        let that = this
        if (that.acces === "mahasiswa") {
            console.log(`=========================================================================================================================================================`)
            console.log("lengkapi data di bawah ini:")
            rl.question('NIM: ', (answer1) => {
                rl.question('Nama: ', (answer2) => {
                    rl.question('Alamat: ', (answer3) => {
                        rl.question('Jurusan: ', (answer4) => {
                            db.serialize(function () {
                                let sql = `INSERT INTO Mahasiswa (nim, nama_Mahasiswa, alamat, jurusan) VALUES ("${answer1.trim()}","${answer2.trim()}","${answer3.trim()}","${answer4.trim()}")`;

                                db.run(sql, (err) => {
                                    if (err) throw err;
                                });
                            })
                            that.getAll()
                        });
                    });
                });
            });
        }
        if (that.acces === "jurusan") {
            console.log(`=========================================================================================================================================================`)
            console.log("lengkapi data di bawah ini:")
            rl.question('Kode Jurusan: ', (answer1) => {
                rl.question('Nama Jurusan: ', (answer2) => {
                    db.serialize(function () {
                        let sql = `INSERT INTO Jurusan (Kode_Jurusan, Nama_Jurusan) VALUES ("${answer1.trim()}","${answer2.trim()}")`;
                        db.run(sql, (err) => {
                            if (err) throw err;
                        });
                    })
                    that.getAll()
                });
            });
        }
        if (that.acces === "dosen") {
            console.log(`=========================================================================================================================================================`)
            console.log("lengkapi data di bawah ini:")
            rl.question('NIP: ', (answer1) => {
                rl.question('Nama Dosen: ', (answer2) => {
                    db.serialize(function () {
                        let sql = `INSERT INTO Dosen (Nip, Nama_Dosen) VALUES ("${answer1.trim()}","${answer2.trim()}")`;
                        db.run(sql, (err) => {
                            if (err) throw err;
                        });
                    })
                    that.getAll()
                });
            });
        }
        if (that.acces === "mata kuliah") {
            console.log(`=========================================================================================================================================================`)
            console.log("lengkapi data di bawah ini:")
            rl.question('Kode Mata Kuliah: ', (answer1) => {
                rl.question('Nama Mata Kuliah: ', (answer2) => {
                    rl.question('SKS: ', (answer3) => {
                        db.serialize(function () {
                            let sql = `INSERT INTO MataKuliah (Id_Matkul, nama_Matkul, Sks) VALUES ("${answer1.trim()}","${answer2.trim()}","${answer3.trim()}")`;
                            db.run(sql, (err) => {
                                if (err) throw err;
                            });
                        })
                        that.getAll()

                    });
                });
            });
        }
        if (that.acces === "kontrak") {
            console.log(`=========================================================================================================================================================`)
            console.log("lengkapi data di bawah ini:")
            rl.question('NIM: ', (answer1) => {
                rl.question('Kode Mata Kuliah: ', (answer2) => {
                    rl.question('NIP Dosen: ', (answer3) => {
                        rl.question('Nilai: ', (answer4) => {
                            db.serialize(function () {
                                let sql = `INSERT INTO Krs (Nim, Id_Matkul, Id_Dosen, Nilai) VALUES ("${answer1.trim()}","${answer2.trim()}","${answer3.trim()}","${answer4.trim()}")`;
                                db.run(sql, (err) => {
                                    if (err) throw err;
                                });
                            })
                            that.getAll()
                        });
                    });
                });
            });
        }

    }
    deleteData() {
        let that = this
        if (that.acces === "mahasiswa") {
            console.log(`=========================================================================================================================================================`)
            rl.question('Masukan NIM mahasiswa yang akan dihapus: ', (answer) => {
                db.serialize(function () {
                    let sql = "DELETE FROM Mahasiswa WHERE nim=?"
                    db.run(sql, [answer.trim()], (err) => {
                        if (!err) {
                            console.log(`Mahasiswa dengan NIM: ${answer.trim()} telah dihapus!`)
                        } else if (err) {
                            throw err
                        }
                    })
                })
                that.getAll()
            });
        }
        if (that.acces === "jurusan") {
            console.log(`=========================================================================================================================================================`)
            rl.question('Masukan Kode Jurusan yang akan dihapus: ', (answer) => {
                db.serialize(function () {
                    let sql = "DELETE FROM Jurusan WHERE Kode_Jurusan=?"
                    db.run(sql, [answer.trim()], (err) => {
                        if (!err) {
                            console.log(`Jurusan dengan Kode Jurusan: ${answer.trim()} telah dihapus!`)
                        } else if (err) {
                            throw err
                        }
                    })
                })
                that.getAll()
            });
        }
        if (that.acces === "dosen") {
            console.log(`=========================================================================================================================================================`)
            rl.question('Masukan NIP Dosen yang akan dihapus: ', (answer) => {
                db.serialize(function () {
                    let sql = "DELETE FROM Dosen WHERE Nip=?"
                    db.run(sql, [answer.trim()], (err) => {
                        if (!err) {
                            console.log(`Dosen dengan NIP: ${answer.trim()} telah dihapus!`)
                        } else if (err) {
                            throw err
                        }
                    })
                })
                that.getAll()
            });
        }
        if (that.acces === "mata kuliah") {
            console.log(`=========================================================================================================================================================`)
            rl.question('Masukan Kode Mata Kuliah yang akan dihapus: ', (answer) => {
                db.serialize(function () {
                    let sql = "DELETE FROM MataKuliah WHERE Id_Matkul=?"
                    db.run(sql, [answer.trim()], (err) => {
                        if (!err) {
                            console.log(`Mata Kuliah dengan Kode Mata kuliah: ${answer.trim()} telah dihapus!`)
                        } else if (err) {
                            throw err
                        }
                    })
                })
                that.getAll()
            });
        }
        if (that.acces === "kontrak") {
            console.log(`=========================================================================================================================================================`)
            rl.question('Masukan NIM Mahasiswa yang kontraknya akan dihapus: ', (answer) => {
                db.serialize(function () {
                    let sql = "DELETE FROM Krs WHERE Nim=?"
                    db.run(sql, [answer.trim()], (err) => {
                        if (!err) {
                            console.log(`Kontrak dengan NIM: ${answer.trim()} telah dihapus!`)
                        } else if (err) {
                            throw err
                        }
                    })
                })
                that.getAll()
            });
        }
    }
}
rl.on('close', () => {
    console.log(`=========================================================================================================================================================\n                                                             ANDA BERHASIL LOG OUT\n                                                                  HATUR NUHUN\n=========================================================================================================================================================`)
    process.exit(0);
})
const Itb = new Mahasiswa()

Itb.logIn()

