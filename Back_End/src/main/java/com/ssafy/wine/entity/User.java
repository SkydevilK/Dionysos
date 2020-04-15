package com.ssafy.wine.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
/**
 * @author 김병인
 *
 */
@Builder // builder를 사용할수 있게 합니다.
@Entity // jpa entity임을 알립니다.
@Getter // user 필드값의 getter를 자동으로 생성합니다.
@NoArgsConstructor // 인자없는 생성자를 자동으로 생성합니다.
@AllArgsConstructor
@Table(name = "user")
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long uid;

	@Column(name = "kakaotalkId")
	String kakaotalkId;
	@Column(name = "naverId")
	String naverId;
	@Column(name = "googleId")
	String googleId;
	@Column(name = "facebookId")
	String facebookId;

	@Column(name = "email", length = 50)
	String email;

	@Column(name = "password")
	String password;

	@Column(name = "name", length = 20)
	String nickName;

	@Column(name = "emailcertify")
	String emailCertify;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<WineLike> wineLikes = new ArrayList<>();
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<FeedLike> feedLikes = new ArrayList<>();
	
	@OneToMany(mappedBy = "to", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Follow> follower = new ArrayList<>();

	@OneToMany(mappedBy = "from", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Follow> following = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Feed> feeds = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Comment> comments = new ArrayList<>();

	@ElementCollection(fetch = FetchType.EAGER)
	@Builder.Default
	private List<String> roles = new ArrayList<>();

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
	}

//	isAccountNonExpired : 계정이 만료가 안되었는지
//	isAccountNonLocked : 계정이 잠기지 않았는지
//	isCredentialsNonExpired : 계정 패스워드가 만료 안됬는지
//	isEnabled : 계정이 사용 가능한지

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getUsername() {
		return this.getUid().toString();
	}
}