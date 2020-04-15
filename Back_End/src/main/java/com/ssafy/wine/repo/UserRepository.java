package com.ssafy.wine.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.wine.entity.User;
/**
 * @author 김병인
 *
 */
// Database에 접근
public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findByNickNameLike(String name);

	Optional<User> findByEmail(String email);

	Optional<User> findByKakaotalkId(String kakaotalkId);

	Optional<User> findByGoogleId(String googleId);

	Optional<User> findByNaverId(String naverId);

	@Transactional
	@Modifying
	@Query(value = "UPDATE user u set u.emailcertify = 'Y' where u.email = :email", nativeQuery = true)
	Integer updateEmail(@Param("email") String email);

	@Transactional
	@Modifying
	@Query(value = "UPDATE user u set u.email = :email, u.name = :nickName, u.password = :password where u.uid = :uid", nativeQuery = true)
	Integer updateEmailUser(@Param(value = "uid") String uid, @Param("email") String email,
			@Param("nickName") String nickName, @Param("password") String password);

	@Transactional
	@Modifying
	@Query(value = "UPDATE user u set u.nickName = :nickName where u.uid = :uid", nativeQuery = true)
	Integer updateSNSUser(@Param("uid") String uid, @Param("nickName") String nickName);

}