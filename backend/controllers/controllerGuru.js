
 const {Guru,guruAbsen,Absensi,gurujaga,kelas} = require('../models/index')
 const cron = require('node-cron');
const { encryptPassword } = require('../helper/crpyto');
class Controller {
    static async getGuru(req, res, next) {
        try {
            const gurus = await Guru.findAll({
                order: [['username', 'ASC']]  // Mengurutkan berdasarkan kolom 'name' secara ascending (A-Z)
            });
            res.status(200).json(gurus);
        } catch (error) {
            console.error("Error occurred:", error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
    
    static async postGuru(req,res) {
        try {
            const { username, Golongan, umur, jenisKelamin, password,role} = req.body;
            const type = "Pengajar"
    const newGuru = await Guru.create({
      username,
      Golongan,
      umur,
      jenisKelamin,
      password,
      role,
      type
    });
    // console.log(newGuru);
    res.status(201).json(newGuru);
        } catch (error) {
            console.log(error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                let errors = error.errors.map(el => {
                    return { message: el.message }
                })
                res.status(400).json(errors)
            }
        }
    }
    static async deletedGuru(req,res) {
        try {
            const {id} = req.params
            const data = await Guru.findOne({
                where : {
                    id : req.params.id
                }
            })
            if (!data) {
                throw {
                    name : 'Guru not found'
                }
            }
            await Guru.destroy({
                where : {
                    id
                }
            })
            res.status(200).json({
                msg : 'deleted succesfully'
            })
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteAllGurus(req, res) {
        try {
            // Menghapus semua guru kecuali yang memiliki username 'admin'
            const deletedCount = await Guru.destroy({
                where: {
                    username: { [Sequelize.Op.ne]: 'admin' } // Menggunakan operator not equal
                }
            });
    
            res.status(200).json({
                msg: 'All non-admin gurus deleted successfully',
                deletedCount
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Internal server error',
                error: error.message
            });
        }
    }
    
    static async getGuruById(req,res) {
        try {
            const data = await Guru.findOne({
                where : {
                    id : req.params.id
                }
            })
            if(!data) {
                throw {
                    name : 'Guru not found'
                }
            }
            res.status(200).json(data)
         } catch (error) {
            console.log(error);
        }
    }
    static async updateGuru(req, res) {
        try {
          const { username, Golongan, umur, jenisKelamin, password, jadwalGuruJagaFrom, jadwalGuruJagaTo } = req.body;
          const { id } = req.params;
      
          console.log(id);
          const guru = await Guru.findByPk(id);
      
          if (!guru) {
            throw {
              name: 'Guru not found'
            };
          }
      
          // Dapatkan waktu saat ini
          const now = new Date();
      
          // Ubah jadwalGuruJagaFrom dan jadwalGuruJagaTo menjadi objek Date
          const jadwalGuruJagaFromDate = new Date(jadwalGuruJagaFrom);
          const jadwalGuruJagaToDate = new Date(jadwalGuruJagaTo);
      
          // Tentukan tipe baru berdasarkan waktu saat ini
          let newType = 'Pengajar';
          if (now >= jadwalGuruJagaFromDate && now <= jadwalGuruJagaToDate) {
            newType = 'Pengajar Dan Guru Jaga';
          }
          console.log(newType);
          
          // Perbarui field pada instance
          guru.username = username || guru.username;
          guru.Golongan = Golongan || guru.Golongan;
          guru.umur = umur || guru.umur;
          guru.jenisKelamin = jenisKelamin || guru.jenisKelamin;
          guru.jadwalGuruJagaFrom = jadwalGuruJagaFrom || guru.jadwalGuruJagaFrom;
          guru.jadwalGuruJagaTo = jadwalGuruJagaTo || guru.jadwalGuruJagaTo;
          guru.type = newType;
          guru.password = password || guru.password
          // Jika password disediakan, hash dan perbarui
         
      
          // Simpan perubahan
          await guru.save();
      
          res.status(200).json({
            msg: 'Update berhasil'
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            msg: 'Terjadi kesalahan',
            error: error.message
          });
        }
      }
      
}
const updateGuruTypes = async () => {
    try {
        const now = new Date();

        // Cari semua guru
        const gurus = await Guru.findAll();

        for (const guru of gurus) {
            const jadwalGuruJagaFromDate = new Date(guru.jadwalGuruJagaFrom);
            const jadwalGuruJagaToDate = new Date(guru.jadwalGuruJagaTo);
            let newType = 'Pengajar';
            if (now >= jadwalGuruJagaFromDate && now <= jadwalGuruJagaToDate) {
                newType = 'Pengajar Dan Guru Jaga';
            }
            if (guru.type !== newType) {
                await Guru.update({ type: newType }, { where: { id: guru.id } });
            }
            // console.log(newType , '<<');
        }
        
        
        console.log('Guru types updated successfully.');
    } catch (error) {
        console.error('Error updating guru types:', error);
    }
};
cron.schedule('* * * * *', updateGuruTypes);
module.exports = Controller