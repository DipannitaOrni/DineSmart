package com.eva_oarisa_orni.springboot_backend.model;
import com.eva_oarisa_orni.springboot_backend.model.MealHistory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "meals")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long M_Id; // Primary Key

    @Column(nullable = false)
    private String type;

    @Column(nullable = true)
    private String menu; // Allow null

    @Column(name = "is_special", nullable = true)
    private Boolean isSpecial; // Use Boolean to allow null values

    @Column(nullable = false)
    private String status;

    @Column(nullable = true)
    private Double cost; // Use Double to allow null values

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", referencedColumnName = "studentid", nullable = false)
    private Students student; //foreign key

    // Explicit getter and setter for isSpecial
    public Boolean getIsSpecial() {
        return isSpecial;
    }

    public void setIsSpecial(Boolean isSpecial) {
        this.isSpecial = isSpecial;
    }

    @OneToMany(mappedBy = "meal", cascade = CascadeType.ALL)
    private List<MealHistory> mealHistories;

    public List<MealHistory> getMealHistories() {
        return mealHistories;
    }

    public void setMealHistories(List<MealHistory> mealHistories) {
        this.mealHistories = mealHistories;
    }

}
