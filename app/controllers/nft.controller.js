const db = require('../models')
const Nft = db.nft
const Op = db.Sequelize.Op
const W3 = require('../constants/Contracts')
const MyNftContract = W3.MyNftContract

// Create and Save a new Nft
exports.create = async (req, res) => {
  const {nftId} = req.body

  // Validate request
  if (!nftId) {
    res.status(400).send({
      message: 'nftId can not be empty!'
    })
    return
  }

  // Validate blockchain data
  // try {
  //   const isNftExist = await MyNftContract.methods.exist(req.body.nftId).call()
  //   if (isNftExist) {
  //     res.status(400).send({
  //       message: 'nft is already exists!'
  //     })
  //     return
  //   }
  // } catch (err) {
  //   res.status(400).send({
  //     message: err.message || err.data.message
  //   })
  //   return
  // }

  // Create a Nft
  const nft = {
    nftId: nftId,
    name: req.body.name,
    img: req.body.img,
    isLending: req.body.isLending || false,
    isBorrowed: req.body.isBorrowed || false,
    withdrawable: req.body.withdrawable || false,
    isExpired: req.body.isExpired || false,
    price: req.body.isBorrowed || 0,
    days: req.body.days || 0,
    collateral: req.body.collateral || 0,
    borrower: req.body.borrower,
    borrowAt: req.body.borrowAt,
    owner: req.body.owner || '0x0000000000000000000000000000000000000000',
    originOwner: req.body.originOwner || '0x0000000000000000000000000000000000000000',
    contractAddress: req.body.contractAddress || '',
    gamelandNftId: req.body.gamelandNftId || '',
  }

  // Save Nft in the database
  Nft.create(nft)
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while creating the Nft.'
      })
    })
}

// Retrieve all Nfts from the database.
exports.findAll = (req, res) => {
  const query = req.query
  // var condition = originOwner ? { originOwner: { [Op.like]: `%${originOwner}%` } } : null;
  const keys = Object.keys(query)
  var queryObj = {}
  keys.forEach((item) => {
    queryObj[item] = {
      [Op.like]: `%${query[item]}%`
    }
  })
  var condition = keys.length ? queryObj : null

  Nft.findAll({ where: condition })
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while retrieving nft.'
      })
    })
}

// Find a single Nft with an id
exports.findOne = (req, res) => {
  const nftId = req.params.nftId

  Nft.findByPk(nftId)
    .then((data) => {
      res.send({
        code: 1,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Error retrieving Nft with nftId=' + id
      })
    })
}

// Update a Nft by the id in the request
exports.update = (req, res) => {
  const nftId = req.params.nftId

  Nft.update(req.body, {
    where: { nftId: nftId }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'Nft was updated successfully.'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot update Nft with nftId=${nftId}. Maybe Nft was not found or req.body is empty!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Error updating Nft with nftId=' + nftId
      })
    })
}

// Delete a Nft with the specified id in the request
exports.delete = (req, res) => {
  const nftId = req.params.nftId

  Nft.destroy({
    where: { nftId: nftId }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          code: 1,
          message: 'Nft was deleted successfully!'
        })
      } else {
        res.send({
          code: 0,
          message: `Cannot delete Nft with nftId=${nftId}. Maybe Nft was not found!`
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: 'Could not delete Nft with nftId=' + nftId
      })
    })
}

// Delete all Nfts from the database.
exports.deleteAll = (req, res) => {
  Nft.destroy({
    where: {},
    truncate: false
  })
    .then((nums) => {
      res.send({
        code: 1,
        message: `${nums} Nfts were deleted successfully!`
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while removing all nft.'
      })
    })
}

// Find all published Nfts
exports.findAllLending = (req, res) => {
  Nft.findAll({ where: { isLending: true } })
    .then((data) => {
      res.send({
        code: 0,
        data: data
      })
    })
    .catch((err) => {
      res.status(500).send({
        code: 0,
        message: err.message || 'Some error occurred while retrieving nft.'
      })
    })
}
