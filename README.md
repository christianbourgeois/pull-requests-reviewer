#1 Generate your .pem key and store it in the root as mykey.pem file. On unix / mac, the command to generate the file is openssl genrsa 2048 | openssl pkcs8 -topk8 -nocrypt > mykey.pem. Note: the generated file is in .gitignore file, it won't be (and should NOT be) commited to the repository unless you know what you are doing.