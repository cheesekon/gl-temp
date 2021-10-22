const axios = require('axios')
const querystring = require('querystring')

const baseUrl = 'https://api.nftport.xyz/v0'
const http = axios.create({
  baseURL: baseUrl,
  timeout: 6000,
  headers: {
    Authorization: process.env.NFTPORTS_KEY
  }
})

// Retrieve NFTs which added in gameland from nftports
exports.getAll = (req, res) => {
  const query = req.query
  const queryStr = querystring.stringify(query)
  const url = `https://api.nftport.xyz/v0/nfts?${queryStr}`

  http.get(url).then(response => {
    const {status, data} = response
    if(status === 200 && data.response === 'OK') {
      res.send({
        code: 1,
        data: data.nfts
      })
    }else{
      res.status(500).send({
        code: 0,
        message: data.detail || data.error || 'Some error occurred while retrieving nfts.'
      })
    }
  }).catch(err=>{
    res.status(500).send({
      code: 0,
      message: err.response.data.detail || err.message || 'Some error occurred while retrieving nfts.'
    })
  })
}

// Retrieve NFT details
exports.details = (req, res) => {
  const query = req.query
  const queryStr = querystring.stringify(query)
  const contractAddress = req.params.address
  const nftId = req.params.nftId
  const url = `https://api.nftport.xyz/v0/nfts/${contractAddress}/${nftId}?${queryStr}`

  http.get(url)
    .then(response => {
      const {status, data} = response
      
      if(status === 200 && data.response === 'OK') {
        res.send({
          code: 1,
          data: data.nft
        })
      }else{
        res.status(500).send({
          code: 0,
          message: data.detail || data.error || 'Some error occurred while retrieving nft.'
        })
      }
    }).catch(err=>{
      res.status(500).send({
        code: 0,
        message: err.response.data.detail || err.message || 'Some error occurred while retrieving nft.'
      })
    })
}

// Retrieve contract NFTs
exports.contracts = (req, res) => {
  const query = req.query
  const queryStr = querystring.stringify(query)
  const contractAddress = req.params.address
  const url = `https://api.nftport.xyz/v0/nfts/${contractAddress}?${queryStr}`

  http.get(url)
    .then(response => {
      const {status, data} = response
      
      if(status === 200 && data.response === 'OK') {
        res.send({
          code: 1,
          data: data.nfts
        })
      }else{
        res.status(500).send({
          code: 0,
          message: data.detail || data.error || 'Some error occurred while retrieving nfts.'
        })
      }
    }).catch(err=>{
      res.status(500).send({
        code: 0,
        message: err.response.data.detail || err.message || 'Some error occurred while retrieving nfts.'
      })
    })
}

// Retrieve NFTs owned by an account
exports.account = (req, res) => {
  const query = req.query
  const queryStr = querystring.stringify(query)
  const account = req.params.account
  const url = `https://api.nftport.xyz/v0/accounts/${account}?${queryStr}`


  http.get(url)
    .then(response => {
      const {status, data} = response
      
      if(status === 200 && data.response === 'OK') {
        res.send({
          code: 1,
          data: data.nfts
        })
      }else{
        res.status(500).send({
          code: 0,
          message: data.detail || data.error || 'Some error occurred while retrieving nfts.'
        })
      }
    }).catch(err=>{
      res.status(500).send({
        code: 0,
        message: err.response.data.detail || err.message || 'Some error occurred while retrieving nfts.'
      })
    })
}