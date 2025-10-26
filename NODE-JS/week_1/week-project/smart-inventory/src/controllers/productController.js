const zlib = require('zlib');
const crypto = require('crypto');
const productsService=require('../services/productService');
const sendJson=require('../utils/sendJson');
const parseQuery=require('../utils/parseQuery');
const HMAC_SECRET_KEY = 'key_12345';
function getAllProduct(req, res) {
    let query;
    try {
        ({ query } = parseQuery(req));
        const result = productsService.getAll(query);
        sendJson(res, 200, result);
        
    } catch (e) {
        if (e.message.startsWith('400')) {
             sendJson(res, 400, { 
                 error: "Bad Request", 
                 message: e.message.replace('400: ', '') 
             });
        } 
        else if (e.message.startsWith('500')) {
            sendJson(res, 500, { 
                error: "Internal Server Error", 
                message: e.message.replace('500: ', '') 
            });
        } 
        else {
             sendJson(res, 500, { error: "Unexpected Server Error", message: e.message });
        }
    }
};
function getProductByid(req,res,id){
    try {
        const product = productsService.getById(id);
        if (product) {
            sendJson(res, 200, product);
        } else {
            sendJson(res, 404, { error: "Not Found", message: `Product with ID ${id} not found` });
        }
    } catch (e) {
        sendJson(res, 500, { error: "Internal Server Error" });
    }
}
function getProductBySku(req, res, sku) {
    try {
        const product = productsService.getBySku(sku);
        
        if (product) {
            sendJson(res, 200, product);
        } else {
      
            sendJson(res, 404, { error: "Not Found", message: `Product with SKU ${sku} not found` });
        }
    } catch (e) {
        sendJson(res, 500, { error: "Internal Server Error" });
    }
};
function  getProductByCategory(res,req,category){
   const data=productsService.getByCategory(category);
   try{
      if(data){
        sendJson(res,200,data);
      }else{
        sendJson(res, 404, { error: "Not Found", message: `Product with category ${category} not found` });
      }
   }catch(e){
      sendJson(res, 500, { error: "Internal Server Error" });
   }
}

function exportProducts(req, res) {
    try {
        const products = productsService.getRawData();
        
        const jsonPayload = JSON.stringify(products);

        zlib.gzip(jsonPayload, (err, compressedPayload) => {
            if (err) {
                console.error("Zlib compression error:", err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: "Compression Failed" }));
                return;
            }

            const hmac = crypto.createHmac('sha256',HMAC_SECRET_KEY);
            hmac.update(compressedPayload);
            const signature = hmac.digest('hex');

            res.writeHead(200, {
                'Content-Type': 'application/gzip',
                'Content-Disposition': 'attachment; filename="products.json.gz"',
                'Content-Length': compressedPayload.length,
                'X-Signature': signature 
            });

            res.end(compressedPayload);
        });

    } catch (e) {
        console.error("Export error:", e);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Internal Server Error during data retrieval" }));
    }
}



module.exports={
  getAllProduct,
  getProductByid,
  getProductBySku,
  getProductByCategory,
  exportProducts
}