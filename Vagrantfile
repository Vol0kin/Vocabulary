
Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/bionic64"

    config.vm.define "Vocabulary"

    config.vm.network "forwarded_port", guest: 8080, host: 8080, host_ip: "127.0.0.1"

    config.vm.provider "virtualbox" do |vb|
        vb.name = "Vocabulary"
        vb.memory = "1024"
        vb.cpus = 1
    end

    config.vm.provision "ansible" do |ansible|
        ansible.playbook = "provisioning/playbook.yml"
    end
end