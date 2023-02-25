import admin from 'firebase-admin'

 
var serviceAccount = {
    "type": "service_account",
    "project_id": "twet-storage",
    "private_key_id": "8682937b80bb25af05516f2e1d174b2a79383e33",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC50STyngZj+BX6\nomPuKCcB27e283RV8Rd5FIgfrOeomgirqARsTaBUKFoXj5Wm6TAukc3+YrF0ndRZ\n+VMklQ4bAEuPDzpceKDUt2LjJB6MLmApPH7amLC8DTGImcNAF2hEgEGTOsezDlMA\nRVIMaSb5HO7gILzIBF8PoDu6KH9WQNqlOtQWRNngMrGRfC6T/ZklYfa7hOMgO/2D\nF5rjQHd4LUClj2lNyUJY7HJIFqBOjoM27TO/UOulQhlNUendtAKc0d+NgsvvEa28\nmeag7f3dDzTs0x/lhej77e1j15t2qgXT9WEV7vWnKvgZuOEbzWqTRpicYNwo2Vt/\nidn1wgRbAgMBAAECggEAD1vbKvam3pJ99pZ/ngrRlpS7rbKX1ha0cvygd8XJ7CS3\nPMEJhI4yB2LCd5oVq5MwuVix5ynvMw1spPc3yRlM7ixrEmsWztflq09xLAcrQzj+\nF8p5TcY7LYAFrR3QhraolqjnQq0kHoe7kpUoQABdCVA76miqUfoShW8gILYCOHXF\noOEvzoLOPB3rNTNWSV4TrpiwWb2vtcVDDXhgSHK0pdP92LMCiBXhqobQBesXmshP\nqxc47jhsrmBwvHNi0QBeHVi6nnur3X3cAbGDAdHjSlHCj1ag0Y+rCFEfy7IL5lhy\n+7W/inBxB/Gz5V3nK8rkVSsfkXL+2CXPGqoiyQFV0QKBgQDw6qQGqc7+olGmmsbO\n1l0XDa+SLGZQZ0L6HAFhESYZnvwc8udxBZHT+nkdy1Z5vtPbLBGZNVgd+MGw2FvN\npsj97N5EuAS/79zQBqCr/cszIg49YGkHsIz9W68ZeazzUT1wZPxaipT09bX0UcIm\nsZXDPPB4F7dnZLs/L1sGS9QX4wKBgQDFc2EJdNfuGgCkvNaS43bGxljjMR7JwdvQ\n2T5QFnyc3b7uQ1JTiLR9PHLtDQaWqjKsClfYeV4JOqZZ9CDp9dWOsi4c1Rm/YgmN\nuR2Jr22Y3OLGQMqvDCpHEnZN2bpjsnmEXZgiLolVaOFi6NFqa6HWf55x9wxm3YML\nCptbzynbKQKBgDXvUelr+rtm+4ChBgEoXI7csYG4Du/RLl1wB58Dh9QUk7ynZMkY\nxhz+5j6VVzbKUgOvSgFSv/d1yWceCO9xd23hqaEY0Xdm67hmw3G9z9ASv71d6CWg\nkO/npru9UcrnVSnkcdqTS+XLXIDmDOE8wJqE+hDovlaXZpQuteIi98ihAoGANmGa\nvkICHr/moXipGHexhPmoDZq/wg20fwb2VJR86a9hILpF+F/UZhG6DXPi9qgVoLCQ\nlTyIG76dhnTog8eDc/O7I5HFr6JOw0vSyNMaOlnL05KQwDl3g2+gSbzHyyGiukQU\n3IU4qd9jBBzfYJIYVr17ZCQItGQZ7XaUZ2rdOlECgYEAlWSgUHWw9CJva7uxN+OK\nfisRduXRahURfpeFvEkaydM/cD1bDJeynHsisuWZpTKr9CwhRucy0d+baTnCLbZK\nblhPdd+1DjLsklAI9Ib865HjVIY8Ds8SP1OyG1VEPjHtE0+hK/ahD80pqCErRI9U\n517UcNjAOpoljpBb2vixaJI=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-qlo1f@twet-storage.iam.gserviceaccount.com",
    "client_id": "101375600258678700033",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qlo1f%40twet-storage.iam.gserviceaccount.com"
  }
  
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://twet-storage.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://twet-storage.appspot.com");

export default bucket; 