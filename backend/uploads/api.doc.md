API DOC GHAT
List endPoints
## endpoints :

1. Guru : 
    - get/guru
    - get/guru/:id
    - post/guru
    - put/guru/:id
    - delete/kelas/:io
2. Kelas : 
    - get/kelas
    - get/kelas/:id
    - post/kelas
    - put/kelas/:id
    - delete/kelas/:id
3. absen : 
    - get/absen
    - get/absen/:id
    - post/absen
    - post/loginGuru
    - get/guruAbsen
 ## Guru : 
Mendapatkan Semua Guru
Endpoint: GET /guru

Deskripsi: Mengambil semua data Guru termasuk absensi mereka.

Respon:

200 OK: Mengembalikan array objek Guru termasuk data absensi mereka.
500 Internal Server Error: Terjadi kesalahan saat mengambil data.
Contoh Permintaan:

```
GET /guru
```
Contoh Respon:

```
[
    {
        "id": 1,
        "name": "John Doe",
        "Golongan": "A",
        "umur": 30,
        "jenisKelamin": "Laki-laki",
        "guruAbsen": [...]
    },
      {
        "id": 2,
        "name": "John Doe",
        "Golongan": "A",
        "umur": 30,
        "jenisKelamin": "Laki-laki",
        "guruAbsen": [...]
    },
    ...
]
```
Mendapatkan Guru Berdasarkan ID
Endpoint: GET /guru/:id

Deskripsi: Mengambil data Guru tertentu berdasarkan ID mereka.

Parameter: id (wajib): ID dari Guru yang ingin diambil.

Respon:

200 OK: Mengembalikan objek Guru.
404 Not Found: Guru dengan ID yang ditentukan tidak ada.
500 Internal Server Error: Terjadi kesalahan saat mengambil data.
Contoh Permintaan:

```
GET /guru/1
```
```
{
    "id": 1,
    "name": "John Doe",
    "Golongan": "A",
    "umur": 30,
    "jenisKelamin": "Laki-laki"
}
```

Membuat Guru Baru
Endpoint: POST /guru

Deskripsi: Membuat data Guru baru.

Badan Permintaan:
```
name (wajib): Nama Guru.
Golongan (wajib): Golongan Guru.
umur (wajib): Umur Guru.
jenisKelamin (wajib): Jenis Kelamin Guru.
```
Respon:

201 Created: Mengembalikan objek Guru yang telah dibuat.
500 Internal Server Error: Terjadi kesalahan saat membuat data Guru.
Contoh Permintaan:

```
POST /guru
{
        
        "username": "test",
        "Golongan": "v1",
        "umur": 20,
        "jenisKelamin": "p",
        "password": "test12345",
}
```
```
{
   
        "id": 7,
        "username": "test",
        "Golongan": "v1",
        "umur": 20,
        "jenisKelamin": "p",
        "password": "$2a$10$D1mZ9Ax6Jl4y5i/cqRjPP.IGkE2a.maIEjAR1qO/3MMX7LmeQVn0y",
        "createdAt": "2024-05-29T13:15:57.000Z",
        "updatedAt": "2024-05-29T13:15:57.000Z"
}
```

Memperbarui Guru yang Ada
Endpoint: PUT /guru/:id

Deskripsi: Memperbarui data Guru yang ada berdasarkan ID.

Parameter:

id (wajib): ID dari Guru yang ingin diperbarui.
Badan Permintaan:
```
name (opsional): Nama Guru.
Golongan (opsional): Golongan Guru.
umur (opsional): Umur Guru.
jenisKelamin (opsional): Jenis Kelamin Guru.
```
Respon:

200 OK: Mengembalikan pesan sukses.
404 Not Found: Guru dengan ID yang ditentukan tidak ada.
500 Internal Server Error: Terjadi kesalahan saat memperbarui data Guru.
Contoh Permintaan:


```
PUT /guru/1
Content-Type: application/json

{
    "name": "John Smith",
    "Golongan": "B",
    "umur": 35,
    "jenisKelamin": "Laki-laki"
}

```

contoh respon 
``` 
{
    "msg": "updated successfully"
}
```

Menghapus Guru
Endpoint: DELETE /guru/:id

Deskripsi: Menghapus data Guru berdasarkan ID.

Parameter:

id (wajib): ID dari Guru yang ingin dihapus.
Respon:

200 OK: Mengembalikan pesan sukses.
404 Not Found: Guru dengan ID yang ditentukan tidak ada.
500 Internal Server Error: Terjadi kesalahan saat menghapus data Guru.
Contoh Permintaan:

```
DELETE /guru/1
```

contoh respon 

```
{
    "msg": "deleted successfully"
}
``` 
Model
Guru
```
    - id: Integer, Primary Key
    - name: String
    - Golongan: String
    - umur: Integer
    - jenisKelamin: String
    - guruAbsen: Array (Opsional, catatan absensi terkait)
```


## Kelas 

Mendapatkan Semua Kelas
Endpoint: GET /kelas

Deskripsi: Mengambil semua data Kelas termasuk absensi mereka (kelasAbsen).

Respon:

200 OK: Mengembalikan array objek Kelas termasuk data absensi mereka.
500 Internal Server Error: Terjadi kesalahan saat mengambil data.
Contoh Permintaan:

```
GET /kelas
```

contoh respon 
```
[
    {
        "id": 1,
        "name": "Kelas 1",
        "kelasAbsens": [...]
    },
    {
        "id": ,
        "name": "Kelas 2",
        "kelasAbsens": [...]
    },
]
```

Mendapatkan Kelas Berdasarkan ID
Endpoint: GET /kelas/:id

Deskripsi: Mengambil data Kelas tertentu berdasarkan ID mereka.

Parameter:

id (wajib): ID dari Kelas yang ingin diambil.
Respon:

200 OK: Mengembalikan objek Kelas.
404 Not Found: Kelas dengan ID yang ditentukan tidak ada.
500 Internal Server Error: Terjadi kesalahan saat mengambil data.
Contoh Permintaan:

```
GET /kelas/1
``` 
contoh respon 
```
{
    "id": 1,
    "name": "Kelas 1",
    "kelasAbsens": [...]
}
```

Membuat Kelas Baru
Endpoint: POST /kelas

Deskripsi: Membuat data Kelas baru.

Badan Permintaan:
```
name (wajib): Nama Kelas.
```
Respon:

201 Created: Mengembalikan objek Kelas yang telah dibuat.
500 Internal Server Error: Terjadi kesalahan saat membuat data Kelas.
Contoh Permintaan:

```
POST /kelas

{
    "name": "Kelas 1"
}
```
Contoh Respon:
```
{
    "id": 2,
    "name": "Kelas 1"
}
```

Memperbarui Kelas yang Ada
Endpoint: PUT /kelas/:id

Deskripsi: Memperbarui data Kelas yang ada berdasarkan ID.

Parameter:

id (wajib): ID dari Kelas yang ingin diperbarui.
Badan Permintaan:
```
name (opsional): Nama Kelas.
```
Respon:

200 OK: Mengembalikan pesan sukses.
404 Not Found: Kelas dengan ID yang ditentukan tidak ada.
500 Internal Server Error: Terjadi kesalahan saat memperbarui data Kelas.
Contoh Permintaan:

```
PUT /kelas/1


{
    "name": "Kelas 2"
}
```

Contoh respon 
```
{
    "msg": "updated successfully"
}
```

Menghapus Kelas
Endpoint: DELETE /kelas/:id

Deskripsi: Menghapus data Kelas berdasarkan ID.

Parameter:

id (wajib): ID dari Kelas yang ingin dihapus.
Respon:

200 OK: Mengembalikan pesan sukses.
404 Not Found: Kelas dengan ID yang ditentukan tidak ada.
500 Internal Server Error: Terjadi kesalahan saat menghapus data Kelas.
Contoh Permintaan:
```
DELETE /kelas/1
```

Contoh respon 
``` 
{
    "msg": "deleted successfully"
}
```

Model
Kelas
```
    - id: Integer, Primary Key
    - name: String
    - kelasAbsens: Array (Opsional, catatan absensi terkait)
```

## Absen 
- Login


URL: /login
Metode: POST

Deskripsi: Mengautentikasi pengguna dan mengembalikan token JWT.

Badan Permintaan (Request Body):
```
{
  "username": "string",
  "password": "string"
}
```

Respons:

Sukses: 201 Created
```
{
  "access_token": "string",
  "user": {
    "id": "integer",
    "username": "string",
    // properti pengguna lainnya
  }
}
```
gagal : `400 bad request`
```
{
  "error": "Login tidak valid"
}
```

- Guru Absen

URL: /guru-absen

Metode: POST

Deskripsi: Merekam absensi guru.

Badan Permintaan (Request Body):

Data formulir yang berisi guruId, kelasId, dan foto_absen (file).
```
{
  "guruId": "integer",
  "kelasId": "integer",
  "foto_absen": "file"
}
```
 Respons 
 - sukses : `201 Created`
 ```
 {
  "id": "integer",
  "guruId": "integer",
  "kelasId": "integer",
  "foto_absen": "string",
  "tanggalAbsen": "date",
  "status": "Pending"
}
```
- Gagal
```
{
  "error": "Kesalahan Server Internal"
}
```