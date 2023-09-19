# All about the app

Untuk mengakses aplikasi ini, user perlu datang dari halaman wordpress. Yakni, halaman single_quiz di wordpress. Idealnya, ketika masuk akan ada 3 query parameter url, yakni quiz_id, name, dan email. 
Aplikasi di backend (melalui next.config.js) akan mengecek ketiga parameter ini ada atau tidak. Jika tidak ada, maka user akan diredirect ke halaman error. Jika ada, maka user bisa melanjutkan.

Saat aplikasi mulai melanjutkan, sebelum halaman dimuat, app akan mengambil mengambil semua data yang tersedia berdasarkan quiz id. Data yang diambil adalah:
1. Judul Quiz (string)
2. Question ID

Data-data tersebut akan disimpan ke cookies, agar selanjutnya dapat diakses di frontend. Setelah data tersimpan, setelah data tersimpan, maka app bisa melanjutkan untuk meload halaman.
