// Fungsi untuk Admin menugaskan kurir ke suatu pesanan
export const assignCourier = async (orderId, courierId) => {
  const response = await fetch(`/api/orders/${orderId}/assign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Tambahkan token auth jika ada
    },
    body: JSON.stringify({ courier_id: courierId }),
  });
  return response.json();
};

// Fungsi untuk Kurir mengubah status pesanan menjadi selesai/sampai
export const completeOrder = async (orderId) => {
  const response = await fetch(`/api/orders/${orderId}/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};