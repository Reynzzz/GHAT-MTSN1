
const {kelas,Absensi,Guru,dataKelas} = require('../models/index')
const { compare } = require("../helper/bcrypt");
const { sign } = require("../helper/jwt");
class Controller {
    static async getKelas(req,res) {
        try {
            // console.log(kelas);
            const data = await kelas.findAll();
        res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
         
    } 
    static async postKelas(req,res) {
        try {
            const {name,password} = req.body
            const data = await kelas.create({
                name,
                password
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async deletedKelas(req,res) {
        try {
            const {id} = req.params
            const data = await kelas.findOne({
                where : {
                    id : req.params.id
                }
            })
            if (!data) {
                throw {
                    name : 'kelas not found'
                }
            }
            await kelas.destroy({
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
     static async getKelasById(req,res) {
      try {
          const data = await kelas.findOne({
              where : {
                  id : req.params.id
              },
              include: [{
                  model: dataKelas,
                  as: 'DataKelas' 
                }]
          })
          if(!data) {
              throw {
                  name : 'kelas not found'
              }
          }
          res.status(200).json(data)
       } catch (error) {
          console.log(error);
      }
  }
    static async updateKelas(req,res) {
      try {
          const {name,password} = req.body
          const {id} = req.params
          
          const data = await kelas.findOne({
              where : {
                  id : req.params.id
              }
          })
          
          if (!data) {
              throw {
                  name : 'kelas not found'
              }
          }
         data.name = name || data.name;
         data.password = password || data.password
         await data.save()
          res.status(200).json({
              msg : 'updated successfuly'
          })
      } catch (error) {
          console.log(error,'ni error');
      }
  }
    static async HandleLoginKelas(req, res) {
        try {
          const { name, password } = req.body;
          console.log(req.body);
          const user = await kelas.scope('withPassword').findOne({ where: { name } });
          console.log(user);
          
          if (!user) {
            throw {
              name: "invalid login",
            };
        } else {
              console.log(user.password);
            let comparePassowrd = compare(password, user.password);
            if (!comparePassowrd) {
              throw {
                name: "invalid loginnn",
              };
            } else {
              const { id, name } = user;
              let token = sign({
                id,
                name,
              });
              console.log(token);
              res.status(201).json({
                access_token: token,
                user,
              });
            }
          }
        } catch (error) {
          console.log(error);
          //    next(error)
          if(error.name === 'invalid login') {
            res.status(401).json({
              msg : 'Invalid Login'
            })
          } else {
            res.status(500).json({
              msg : 'Internal server Error'
            })
          }
        }
      }
      static async getAbsensiScheduleKelas(req, res) {
        try {
          // console.log(req.user);
          const kelasId = req.user.id;
          const absensis = await Absensi.findAll({
            where: {
              kelasId: kelasId,
            },
            include: [
              {
                model: Guru,
                as: "Guru",
              },
              {
                model: kelas,
                as: "Kelas",
              },
            ],
          });
          res.status(200).json(absensis);
        } catch (error) {
          console.error("Error fetching absensi:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
      static async postDataKelas(req,res) {
        try {
            const kelasId = req.user.id
            const {absenKelas,jumlahTidakHadir,details} = req.body
            const data = await dataKelas.create({
                absenKelas,
                jumlahTidakHadir,
                details,
                kelasId
            })
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getDataKelas(req, res) {
        try {
          const kelasId = req.user.id; // ID dari pengguna yang terautentikasi
    //   console.log(kelasId);
          // Pastikan hanya kolom yang dikenal yang diminta
          const data = await dataKelas.findAll({
            where: {
              kelasId: kelasId,
            },
            include: [
              {
                model: kelas,
                as: 'Kelas'
              }
            ],
            attributes: ['id', 'absenKelas', 'jumlahTidakHadir', 'details', 'kelasId', 'createdAt', 'updatedAt'],
          });
      
          res.status(200).json(data);
        } catch (error) {
          console.error("Error fetching data kelas:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
      
      
}

module.exports = Controller