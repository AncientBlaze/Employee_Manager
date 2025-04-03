import React from 'react';


const AboutUsPage = () => {
  const users = [
    {
      id: 1,
      name: 'Saikat Adhikary',
      email: 'Saikata62@gmail.com',
      role: 'Frontend Developer',
      image: `https://avatars.githubusercontent.com/AncientBlaze`,
    },
    {
      id: 2,
      name: 'Rohit Singha',
      email: 'rohitsingha24pgs@gmail.com',
      role: 'Backend Developer',
      image: 'https://avatars.githubusercontent.com/Rohit731-prg',
    },
    {
      id: 3,
      name: 'Animesh Das',
      email: 'animesh.das@example.com',
      role: 'UI Designer',
      image: 'https://avatars.githubusercontent.com/u/55555557?v=4',
    },
    {
      id: 4,
      name: 'Dipti Mondal',
      email: 'dipti@example.com',
      role: 'Documentation',
      image: 'https://avatars.githubusercontent.com/u/55555558?v=4',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex flex-col items-center justify-center">
      <div className="container mx-auto max-w-7xl p-4 lg:p-6">
        <h1 className="text-5xl font-bold text-white mb-4">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {users.map(user => (
            <div key={user.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-48 rounded-t-lg object-cover"
              />
              <div className="p-4">
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;

