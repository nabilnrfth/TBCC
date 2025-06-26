# Gunakan image Node.js sebagai base
FROM node:18

# Buat direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Jalankan server
CMD ["node", "index.js"]

# Jalankan di port 8080
EXPOSE 8080