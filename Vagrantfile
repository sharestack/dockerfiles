# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "raring64"

  config.vm.box_url = "https://dl.dropboxusercontent.com/u/547671/thinkstack-raring64.box"

  config.vm.network :private_network, ip: "192.168.100.46"

  config.vm.network :forwarded_port, guest: 80, host: 8080 # Nginx

  config.vm.synced_folder ".", "/home/vagrant/dockerfiles"

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "2048"]
    vb.customize ["modifyvm", :id, "--cpus", "2"]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "main.yml"
    ansible.inventory_path = "hosts-dev"
    ansible.verbose = "v"
    ansible.host_key_checking = false
  end
end
