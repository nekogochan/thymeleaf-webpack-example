package com.example.thymeleaf.service;

import com.example.thymeleaf.entity.Address;
import com.example.thymeleaf.entity.Student;
import com.example.thymeleaf.repository.AddressRepository;
import com.example.thymeleaf.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDate;

@Service
@AllArgsConstructor
public class StudentService {

    private AddressRepository addressRepository;
    private StudentRepository studentRepository;

    public Student findById(String id) {
        return this.studentRepository.findById(id).orElseThrow();
    }

    public Student save(Student student) {
        this.studentRepository.save(student);
        this.addressRepository.save(student.getAddress());
        return student;
    }

    public Student update(String id, Student student) {
        Student studentDatabase = this.findById(id);
        BeanUtils.copyProperties(student, studentDatabase, "id", "createdAt", "updatedAt", "address");
        BeanUtils.copyProperties(student.getAddress(), studentDatabase.getAddress(), "id", "createdAt", "updatedAt", "student");
        return this.studentRepository.save(studentDatabase);
    }

    public void deleteById(String id) {
        this.studentRepository.delete(this.findById(id));
    }

    @PostConstruct
    public void init() {
        var student = new Student();
        student.setId("1");
        student.setName("1");
        student.setEmail("1'");
        student.setBirthday(LocalDate.now());

        var address = new Address();
        address.setId("1");
        address.setZipCode("1");
        address.setStreet("1");
        address.setNumber("1");
        address.setComplement("1");
        address.setDistrict("1");
        address.setCity("1");
        address.setState("1");
        student.setAddress(address);
        address.setStudent(student);

        save(student);
        addressRepository.save(address);
    }
}
