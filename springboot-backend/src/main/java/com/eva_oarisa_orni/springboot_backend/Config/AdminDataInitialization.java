package com.eva_oarisa_orni.springboot_backend.Config;


import com.eva_oarisa_orni.springboot_backend.model.Admin;
import com.eva_oarisa_orni.springboot_backend.repository.AdminRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminDataInitialization {

    @Autowired
    private AdminRepository adminRepository;

    @Bean
    public CommandLineRunner initializeAdminData() {
        return args -> {
            // Initialize hardcoded admin data with trimmed email strings
            String hashedPassword1 = BCrypt.hashpw("BangabandhuHall@12345", BCrypt.gensalt());
            String hashedPassword2 = BCrypt.hashpw("Dr.Qudrat-E-HudaHall@12345", BCrypt.gensalt());
            String hashedPassword3 = BCrypt.hashpw("ShahidMohammadShahHall@12345", BCrypt.gensalt());
            String hashedPassword4 = BCrypt.hashpw("ShahidTareqHudaHall@12345", BCrypt.gensalt());
            String hashedPassword5 = BCrypt.hashpw("ShamshenNaharKhanHall@12345", BCrypt.gensalt());
            String hashedPassword6 = BCrypt.hashpw("SufiaKamalHall@12345", BCrypt.gensalt());
            String hashedPassword7 = BCrypt.hashpw("TapashiRabeyaHall@12345", BCrypt.gensalt());
            String hashedPassword8 = BCrypt.hashpw("SheikhRusselHall@12345", BCrypt.gensalt());

            Admin admin1 = new Admin("Bangabandhu Hall", "bangabandhuhall@cuet.ac.bd".trim(), "01712345678", hashedPassword1);
            Admin admin2 = new Admin("Dr. Qudrat-E-Huda Hall", "dr.qudrat-e-hudahall@cuet.ac.bd".trim(), "01987654321", hashedPassword2);
            Admin admin3 = new Admin("Shahid Mohammad Shah Hall", "shahidmohammadshahhall@cuet.ac.bd".trim(), "01823456789", hashedPassword3);
            Admin admin4 = new Admin("Shahid Tareq Huda Hall", "shahidtareqhudahall@cuet.ac.bd".trim(), "01765432109", hashedPassword4);
            Admin admin5 = new Admin("Shamshen Nahar Khan Hall", "shamshennaharkhanhall@cuet.ac.bd".trim(), "01654321098", hashedPassword5);
            Admin admin6 = new Admin("Sufia Kamal Hall", "sufiakamalhall@cuet.ac.bd".trim(), "01543210987", hashedPassword6);
            Admin admin7 = new Admin("Tapashi Rabeya Hall", "tapashirabeyahall@cuet.ac.bd".trim(), "01432109876", hashedPassword7);
            Admin admin8 = new Admin("Sheikh Russel Hall", "sheikhrusselhall@cuet.ac.bd".trim(), "01832309596", hashedPassword8);

            // Save admins to the database
            adminRepository.save(admin1);
            adminRepository.save(admin2);
            adminRepository.save(admin3);
            adminRepository.save(admin4);
            adminRepository.save(admin5);
            adminRepository.save(admin6);
            adminRepository.save(admin7);
            adminRepository.save(admin8);
            System.out.println("Admins initialized in the database!");
        };
    }
}
