let saldoAkhir = prompt("Masukan Saldo Akhir");
alert("Saldo Akhir Anda Adalah " + saldoAkhir);

let hari = new Date().getDay();
document.write("Hari ini adalah hari " + hari + "<br>");

let namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
let hariindex = new Date().getDay();
document.write("hari ini adalah hari  " + namaHari[hariindex]);
